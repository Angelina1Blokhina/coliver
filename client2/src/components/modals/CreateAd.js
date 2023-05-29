import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect } from 'react'
import { Accordion, Form, Row , Button, Col} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { Context } from "../../index"
import {fetchAds, fetchCity, fetchStation, createAd, putPost} from "../../http/AdApi";

const CreateAd = observer(({show, onHide}) => {
    const {ad} = useContext(Context)
    const {user} = useContext(Context)
    const [title, setTitle] = useState();
    const[discription, setDiscription]=useState();
    const[allRooms, setAllRooms]=useState();
    const [address, setAddress]=useState()
    const [price, setPrice] = useState();
    const [availableRooms, setAvailableRooms] = useState();
    const [ageColiverStart, setAgeColiverStart] = useState();
    const [ageColiverEnd, setAgeColiverEnd] = useState();
    const [genderColiver, setGenderColiver] = useState();
  
    const[file, setFile]=useState([])

    const countRooms=['1','2','3','4+']

    useEffect(()=>{
        fetchCity().then(data => ad.setCity(data))
    },[])
    
    useEffect(() => { 
       fetchStation(ad.selectedCity.id).then(data =>ad.setStation(data))  
    }, [ad.selectedCity])

    const [isStationAccordionOpen, setIsStationAccordionOpen] = useState(false);

    const onCityChange = () => {
        setIsStationAccordionOpen(true);
    };
   const addImg=()=>{
    const newFile = {
        file: null,
        number: Date.now(),
      };
      setFile((prevFile) => [...prevFile, newFile]);
   }
    const removeImage = (number) => {
        setFile((prevFile) =>
            prevFile.filter((file) => file.number !== number)
        );
      };
   
      const selectImage = (files, number) => {
        const fileList = Array.from(files);
        const updatedFiles = fileList.map((file) => ({
          file,
          number,
        }));
        setFile((prevFile) => [...prevFile, ...updatedFiles]);
      };
   
  
    
    const addAd = () => {
        const formData = new FormData()
        formData.append('account_id', user.user.id)
        formData.append('title', title)
        formData.append('available_rooms', `${availableRooms}`)
        formData.append('rooms_count', `${allRooms}`)
        formData.append('price', `${price}`)
        formData.append('age_coliver_start', `${ageColiverStart}`)
        formData.append('age_coliver_end', `${ageColiverEnd}`)
        formData.append('gender_coliver', genderColiver)
        formData.append('username', user.user.name)
        formData.append('usergender', user.user.gender)
        formData.append('userage', user.user.age)
        formData.append('discription', discription)
        formData.append('city_id', ad.selectedCity.id)
        formData.append('station_id', ad.selectedStation.id)
        formData.append('address', address)
        file.forEach((fileData) => {
            console.log(fileData.file)
            formData.append('image', fileData.file);
          });
        
        createAd(formData).then(data => onHide())
        
    }
   
    return (
        <Modal show={show}
        onHide={onHide}
        centered>
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                    Создать объявление
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>Ваше имя: <div className="d-flex justify-content-center" style={{border:"1px solid orange", borderRadius:"5px"}}>{user.user.name}</div></Col>
                        <Col>
                            <div>email:<div className="d-flex justify-content-center" style={{border:"1px solid orange", borderRadius:"5px"}}>{user.user.email}</div>
                            </div>телефон:<div className="d-flex justify-content-center" style={{border:"1px solid orange", borderRadius:"5px"}}>{user.account.phone}</div>
                        </Col>  
                    </Row>
                    <Row className="mt-2">
                        <Col>Ваш возраст: <div className="d-flex justify-content-center" style={{border:"1px solid orange", borderRadius:"5px"}}>{user.account.age}</div></Col>
                        <Col>Ваш пол:<div className="d-flex justify-content-center" style={{border:"1px solid orange", borderRadius:"5px"}}>{user.account.gender}</div></Col>  
                    </Row>
                    
                <Form.Control
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="mt-3"
                        placeholder="Введите заголовок объявления"
                        type="text"
                    />
                    <Form.Control
                        value={discription}
                        onChange={e => setDiscription(e.target.value)}
                        className="mt-3"
                        placeholder="Введите описание объявления"
                        type="text"
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость аренды в месяц"
                        type="number"
                    />
                    <Accordion  className="mt-3">
                <Accordion.Item eventKey="0">
                <Accordion.Header>{ad.selectedCity.city || "Город"}</Accordion.Header>
                <Accordion.Body>
                <Form >
                    {ad.city.map(city => (
                        <Form.Check
                            key={city.id}
                            type="radio"
                            label={city.city}
                            checked ={city.city ===ad.selectedCity.city}
                            onChange={() =>{
                                ad.setSelectedCity(city)
                                if (isStationAccordionOpen) {
                                  setIsStationAccordionOpen(false);
                                }
                                onCityChange()}}  
                            />
                    ))}
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>
            <Accordion   className="mt-3">
                <Accordion.Item eventKey="0">
                <Accordion.Header>Станция метро</Accordion.Header>
                <Accordion.Body >
                <Form >
                    {
                    ad.station.map(station => (
                        <Form.Check
                            key={station.id}
                            type="radio"
                            label={station.station}
                            checked={station.checked}
                            onChange={() => ad.setSelectedStation(station)}
                            />
                    ))}
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>
            <Form.Control
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="mt-3"
                        placeholder="Введите адресс"
                        type="text"
                    />
            <Accordion  ></Accordion>
            <Form.Control  
                        value={allRooms}
                        onChange={e => setAllRooms(e.target.value)}
                        className="mt-3"
                        placeholder="Введите сколько комнат в квартире"
                        type="text"
                    />
            <Accordion   className="mt-3">
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>{availableRooms ? `Количество доступных для аренды комнат: ${availableRooms}` : 'Количество доступных для аренды комнат'}</Accordion.Header>
                    <Accordion.Body >
                    <Form className="mt-3">
                    {countRooms.map(room => (
                            <Form.Check
                            key={room}
                            type="radio"
                            label={room}
                            value={room}
                            checked={availableRooms === room} 
                            onChange={e => setAvailableRooms(e.target.value)}
                              />
                        ))}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>     
                <Accordion  className="mt-3">
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>Выберите пол коливера</Accordion.Header>
                    <Accordion.Body >
                    <Form >
                        <Form.Check
                        key={'woman'}
                        type="radio"
                        label={'женщина'}
                        checked={genderColiver === 'женщина'}
                        onChange={() => setGenderColiver('женщина')}
                        />
                        <Form.Check
                        key={'man'}
                        type="radio"
                        label={'мужчина'}
                        checked={genderColiver === 'мужчина'}
                        onChange={() => setGenderColiver('мужчина')}
                        />
                        <Form.Check
                        key={'null'}
                        type="radio"
                        label={'неважно'}
                        checked={genderColiver === 'null'}
                        onChange={() => setGenderColiver('null')}
                        />
                    </Form>
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>   
                    <div  className="mt-3">Введите возраст коливера
                        <div className="mt-3 d-flex align-items-center justify-content-space-between"> 
                        <Form.Label className=" me-2">От:</Form.Label>
                        <Form.Control
                        value={ageColiverStart}
                        onChange={e => setAgeColiverStart(Number(e.target.value))}
                        className=" me-2"
                        placeholder=""
                        type="number"
                    />
                    <Form.Label className=" me-2">До:</Form.Label>
                        <Form.Control
                        value={ageColiverEnd}
                        onChange={e => setAgeColiverEnd(Number(e.target.value))}
                       
                        placeholder=""
                        type="number"
                    />
                    </div>
                    </div>
                    
                    <Button  className="mt-3" variant={"outline-dark"} onClick={addImg}>
                        Добавить фотографию
                    </Button>
                   
                    {file.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={6}>
                            <Form.Control
                                className="mt-3"
                                type="file"
                                accept="image/*"
                                multiple={false}
                                onChange={(e) => selectImage(e.target.files, i.number)}
                                
                            />
                            </Col>
                             <Col md={2}>
                                <Button  className="mt-3"
                                    onClick={() => removeImage(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col> 
                        </Row>
                    )}
                    
                   
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addAd}>Добавить</Button>
            </Modal.Footer>

        </Modal>
    )
      
  });

export default CreateAd