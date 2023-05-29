import { observer } from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Context} from '../index';
import  Accordion  from "react-bootstrap/Accordion";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import {fetchAds, fetchCity, fetchStation} from "../http/AdApi";


const FilterBar = observer(()=> {
    const {ad}= useContext(Context);
    

    useEffect(()=>{
        fetchCity().then(data => ad.setCity(data))
        //fetchStation(ad.selectedCity.id).then(data =>ad.setStation(data)) 
    },[]) 
   {ad.selectedCity && useEffect(() => { 
            fetchStation(ad.selectedCity.id).then(data =>{ad.setStation(data)}) 
        
    }, [ad.selectedCity])}
    /* useEffect(() => { 
        fetchAds(ad.selectedCity.id, ad.selectedStation.id, selectedRooms ).then(data =>ad.setStation(data))  
     },[]) */

    const [isStationAccordionOpen, setIsStationAccordionOpen] = useState(false);
    const count_rooms=['1','2','3','4+']
    const [checkedRooms, setCheckedRooms] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);

    const handleRoomChange = (room) => {
        // обновляем состояние checkedRooms
        const updatedCheckedRooms = checkedRooms.includes(room)
        ? checkedRooms.filter((r) => r !== room)
        : [...checkedRooms, room];
        setCheckedRooms(updatedCheckedRooms);

        // обновляем состояние selectedRooms
        setSelectedRooms(updatedCheckedRooms);
    };
    
   

    const onCityChange = () => {
        setIsStationAccordionOpen(true);
    };

    // добавляем useState для хранения значений полей ввода цены
    const [priceRange, setPriceRange] = useState({ from: '', to: '' });

    const handleSubmit = async () => {
        
        await fetchAds(ad.minPrice,ad.maxPrice,ad.availableRooms,ad.selectedCity.id, ad.selectedStation.id, ad.userGender, 1, 2).then(data=>console.log(data))

      };
  return (
    <Container className="mt-3 d-flex justify-content-center" >
    <Row className="w-100 danger">
        <Col >
            <Accordion >
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
                                console.log(ad.selectedCity)
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
        </Col>
        {isStationAccordionOpen && (
        <Col >
            <Accordion  >
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
                            onChange={() =>{
                                ad.setSelectedStation(station)
                                }  }
                            />
                    ))}
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>
        </Col>
        )}
        <Col >
            <Accordion  >
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>Количество доступных комнат</Accordion.Header>
                    <Accordion.Body >
                    <Form >
                    {count_rooms.map(room => (
                            <Form.Check
                            key={room}
                            type="radio"
                            label={room}
                            checked={checkedRooms.includes(room)}
                            onChange={() => ad.setAvailableRooms(room)}
                                />
                        ))}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
        </Col>
        <Col >
            <Accordion >
                <Accordion.Item eventKey="0">
                <Accordion.Header>Цена,руб</Accordion.Header>
                <Accordion.Body>
                    <Form>
                    <Form.Group controlId="priceFrom">
                        <Form.Label>От:</Form.Label>
                        <Form.Control   
                        type="number" 
                        placeholder="Введите цену от" 
                        value={ad.minPrice}
                        onChange={(e) => ad.setMinPrice( e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="priceTo">
                        <Form.Label>До:</Form.Label>
                        <Form.Control 
                         type="number" 
                         placeholder="Введите цену до" 
                         value={ad.maxPrice}
                         onChange={(e) => ad.setMaxPrice( e.target.value)}/>
                    </Form.Group>
                    </Form>
                </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Col>
        <Col >
            <Accordion >
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>Пол сожителя</Accordion.Header>
                    <Accordion.Body >
                    <Form >
                        <Form.Check
                        key={'woman'}
                        type="radio"
                        label={'женщина'}
                        onChange={() => ad.setUserGender('женщина')}
                        />
                        <Form.Check
                        key={'man'}
                        type="radio"
                        label={'мужчина'}
                        onChange={() => ad.setUserGender('мужчина')}
                        />
                        <Form.Check
                        key={'dm'}
                        type="radio"
                        label={'неважно'}
                        onChange={() => ad.setUserGender('неважно')}
                        />
                    </Form>
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
        </Col>
            
        <Col className="text-center mt-3"> 
            <div className="d-grid"> {/* обернули кнопку в дополнительный div */}
                <Button variant="primary" type="submit"  onClick={handleSubmit}>
                Применить
                </Button>
            </div>
        </Col> 
  </Row>
  </Container>
  );
})

export default FilterBar;