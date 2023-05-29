
import { observer } from "mobx-react-lite";
import React, {useContext} from 'react'

import { Col, Card, Image,Row, Button, Container } from 'react-bootstrap'
import {useHistory} from "react-router-dom"
import {AD_ROUTE} from "../utils/consts";
import { Context } from '../index'


import woman from "../assets/woman.svg"
import man from "../assets/man.svg"
import {deleteFavorites, daeleteOneAd} from "../http/AdApi";


const AdItem = observer(({ad, ad_city, ad_station, image, isFromFavorites, isAllAds, isPosts}) => {
    const history = useHistory()
    const { user } = useContext(Context);
    console.log(image)
    const deleteFav =()=>{
        console.log('deleteFav', ad.id)
        deleteFavorites(ad.id, user.user.id)
    }
    const deletePosts =()=>{
        console.log('deletePosts', ad.id)
        daeleteOneAd(ad.id)
    }
    
    return (
        <Card className=" mt-2" style={{cursor: 'pointer', borderRadius:5}} border={"yellow"} >

            <Container onClick={() => history.push(AD_ROUTE + '/' + ad.id)}>
            <Row className="mt-3">
                <Col md={4}>
                    <Image width={300} height={150} src={`${process.env.REACT_APP_API_URL}static/${image}`} />
                </Col>
                <Col md={8}>
                    <div style={{fontWeight:'bold'}}>{ad.title}</div>
                    <div className=" mt-2 d-flex justify-content-between align-items-center">
                        <div ><span style={{fontWeight:'bold'}}>Цена:</span> {ad.price} рублей</div>
                        <div className="d-flex align-items-center">
                            <div>{ad.username}</div>
                        {ad.usergender === 'woman' || ad.usergender === 'женщина' ? (
                            <Image width={25} height={25} src={woman} className='ms-1'/>
                        ) : (
                            <Image width={25} height={25} src={man} className='ms-1'/>
                        )}
                        </div>
                    </div>
                   
                    <div className=" mt-2"><span style={{fontWeight:'bold'}}>Город: </span>{ad_city}</div>
                    <div className=" mt-2"><span style={{fontWeight:'bold'}}>Метро: </span>{ad_station}</div>
                    <div className="mt-2 mb-3"><span style={{fontWeight:'bold'}}>Доступных комнат: </span>{ad.available_rooms}</div>
                    
                </Col>
            </Row>
            </Container>
           
            {isFromFavorites==true  && (
                <Button variant='primary'  onClick={deleteFav}>
                Удалить
                </Button>
            )}
       {isPosts==true  && (
            <Button variant='primary' onClick={deletePosts}>
            Удалить
            </Button>
      )}

        </Card>
    )
})

export default AdItem
