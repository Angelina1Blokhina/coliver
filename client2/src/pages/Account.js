import { observer } from "mobx-react-lite";
import React,{useContext, useState, useEffect} from "react";
import { Container, Row, Col, Form, Button, Accordion} from "react-bootstrap";
import { Context } from "../index";
import CreateAd from "../components/modals/CreateAd";
import {updateAccount, getAccount } from "../http/UserApi";



const Account = observer(()=> {
  const {user} =useContext(Context)
  console.log(user.user.email, user.account)
  useEffect(()=>{
    getAccount(user.user.id).then(data => user.setAccount(data))
},[user.user])
 

  const [age, setAge] = useState(user.account.age)
  const [phone, setPhone] = useState(user.account.phone)
  const [gender, setGender] = useState(user.account.gender)
  
  const [adVisible, setAdVisible] = useState(false)
  const setChanges = async () => {
    await updateAccount({age,phone, gender, user_id: user.user.id})
    const updatedAccount = await getAccount(user.user.id);
    user.setAccount(updatedAccount); 
  }
  
  return (
    <Container>
    <Container>
      <Row>
        <div className="mt-2 fs-2">Личный аккаунт</div>
      </Row>
      <Row className="mt-4">
        <Col >
          <div><span style={{fontWeight:'bold'}}>Имя:</span> {user.user.name}</div>

          <Row className="mt-4">
            <Col md={4}>
              <div><span style={{fontWeight:'bold'}}>Возраст:</span>   {user.account.age} </div>
            </Col>
            <Col md={8}>
              <div className=" d-flex align-items-center justify-content-center">
                  <Form.Control 
                    className="ms-2" 
                    placeholder="Изменить возраст..."
                   value={age}
                   onChange={e => setAge(Number(e.target.value))}
                    />
                <Button className="ms-2"  onClick={setChanges}>Изменить</Button>
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={6}>
              <div><span style={{fontWeight:'bold'}}>Пол:</span>  {user.account.gender}</div>
            </Col>
            <Col md={6}>
              <div className=" d-flex align-items-center justify-content-center">
              <Accordion >
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>Изменить пол</Accordion.Header>
                    <Accordion.Body >
                    <Form >
                        <Form.Check
                        key={'woman'}
                        type="radio"
                        label={'женщина'}
                        checked={gender === 'женщина'}
                        onChange={() => setGender('женщина')}
                        />
                        <Form.Check
                        key={'man'}
                        type="radio"
                        label={'мужчина'}
                        checked={gender === 'мужчина'}
                        onChange={() => setGender('мужчина')}
                        />
                    </Form>
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                  
                  <Button className="ms-2"  onClick={setChanges}>Изменить</Button>
              </div>
            </Col>
          </Row>
          
          
        </Col>
        <Col>
          
          <div style={{fontWeight:"bold"}}>Контакты:</div>
          <div  className="mt-4"><span style={{fontWeight:'bold'}}> email: </span> {user.user.email} </div>
          
          <div className="mt-4"><span style={{fontWeight:'bold'}}>телефон: </span>  {user.account.phone}</div>
          <div className="mt-2 d-flex align-items-center justify-content-center">
            <Form.Control
              placeholder="Введите новый телефон..."
              type='number'
              value={phone}
              onChange={e => setPhone(Number(e.target.value))}
          />
          <Button className="ms-2" onClick={setChanges}>Изменить</Button>
          </div>
        </Col>
        
      </Row>
      <Row className="mt-5 d-flex justify-content-center">
        <Col md={8}>
          <div className="d-flex justify-content-center">
            <Button
              className="ms-2"
              onClick={() => setAdVisible(true)}
            >
              Создать объявление
            </Button>
          </div>
        </Col>
      </Row>
      <CreateAd show={adVisible} onHide={() => setAdVisible(false)}/>
    </Container>
    </Container>
  );
})

export default Account;