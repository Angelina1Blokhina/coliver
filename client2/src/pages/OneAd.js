import { observer } from "mobx-react-lite";
import React from "react";
import { useState, useEffect, useContext} from "react";
import { Context } from "../index";
import {useParams} from 'react-router-dom'
import { Container, Row, Col,Image, Button} from "react-bootstrap";
import { fetchOneCity, fetchImages, fetchOneAd, fetchOneStation, putFavorites } from "../http/AdApi";


const OneAd = observer(()=> {
  const {user} =useContext(Context)
  const [ad, setAd] = useState([])
  const [city, setCity]=useState('')
  const [station, setStation]=useState('')
  const [images, setImages]=useState([])
  const {id} = useParams()
  const [mainImage, setMainImage] = useState('');
    useEffect(() => {
      
      console.log('oneAdId', id)
      fetchOneAd(id).then(data => {console.log('oneAd', data)
        setAd(data)})
      fetchImages(id).then(data => {
        setImages(data)
        if ( !mainImage) {
          setMainImage(data[0].img);
        }
        console.log(data[0].img, mainImage)})
      
    }, [])
    
    useEffect(() => {
      if (ad && ad.city_id) {
        fetchOneCity(ad.city_id).then(data => setCity(data));
      }
      if (ad && ad.station_id) {
        console.log('station_id',ad.station_id)
        fetchOneStation(ad.station_id).then(data =>{console.log('station',data)
          setStation(data)
        } );
      }
    }, [ad]);
    
  const addFavorites =async()=>{
    console.log(user.user.name)
    if(user.user.id){
      await putFavorites(user.user.id, ad.id)
    }
    else{
       console.log('авторизируйтесь')
    }
    
  } 

   
  const handleImageClick = (imageSrc) => {
    setMainImage(imageSrc);
  }
  return (
    <Container>

    <Container className="mt-3">
      <Row>
      <Col md={6}>
        <Image  width="100%" height="75%" src={`${process.env.REACT_APP_API_URL}static/${mainImage}`} onClick={() => handleImageClick()} /> 
        <div className="mt-2 d-flex align-items-center">
           {
            images.map(img =>
            <Image key={img.id} style={{cursor: 'pointer'}} width="20%" height={70} src={`${process.env.REACT_APP_API_URL}static/${img.img}`} 
                  onClick={() => handleImageClick(img.img)} />
          )}  
         </div>
      </Col>
        <Col md={6} >
        <div style={{fontWeight:"bold"}} className="d-flex align-items-center justify-content-center fs-2 text-uppercase text-break" >{ad.title}</div>
        <div style={{border:'7px double orange', borderRadius:'5px', padding:'15px', marginTop:"15px"}}>
          <div className="mt-2"><span style={{fontWeight:"bold"}}>Цена:</span> {ad.price} рублей/месяц </div>
          <div className="mt-4"><span style={{fontWeight:"bold"}}>Город: </span>{city.city}</div>
          <div className="mt-2"><span style={{fontWeight:"bold"}}>Метро: </span>{station.station} </div>
          <div className="mt-2"><span style={{fontWeight:"bold"}}>Адрес: </span>{ad.address}  </div>
          <div className="mt-4">
            <div className="mt-1"><span style={{fontWeight:"bold"}}>Я:</span> {ad.usergender}, {ad.userage} лет</div>
            <div className="mt-1"><span style={{fontWeight:"bold"}}>Ищу:</span> {ad.gender_coliver}, от {ad.age_coliver_start} лет до {ad.age_coliver_end} лет</div>
          </div>
        </div>
        <div className="mt-2 d-flex align-items-center justify-content-center">
          <Button style={{backgroundColor:"lightpink", borderColor:"lightpink"}} onClick={addFavorites}>Добавить в избранное</Button>
        </div>
        
        </Col>
      </Row>
      <Row>
        <div className="mt-2 fs-4" style={{fontWeight:"bold"}}>Описание</div>
        <div className="mt-2">{ad.discription}</div>
      </Row>
      <Row className="mt-4">
        <Col >
          <div style={{fontWeight:"bold"}}>Контакты:</div>
          <div>email: {ad.contact_email}</div>
          <div>телефон: {ad.contact_phone}</div>
        </Col>
        <Col>
          <div className="mt-5">Пользователь: {ad.username}</div>
          
        </Col>
      </Row>

    </Container>
    </Container>
  );
} )

export default OneAd;