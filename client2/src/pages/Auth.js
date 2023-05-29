import React, {useContext, useState} from "react";
import { Button, Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { registration } from "../http/UserApi";
import {observer} from "mobx-react-lite";
import { Context } from "../index";
import {ALL_ADS_ROUTE} from "../utils/consts";
import { useHistory } from "react-router-dom";

const Auth = observer(()=> {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {user} = useContext(Context)
  const history = useHistory()
  const signIn = async () =>{
    const data= await registration(name,email, password)
    try{
      
      user.setUser(data)
      user.setIsAuth(true)
      history.push(ALL_ADS_ROUTE)
    }
    catch(e){
      if (e.response && e.response.data) {
        alert(e.response.data.message)
      } else {
        alert(e.message)
      }
    }
    
  }
  

  return (
    <Container className="d-flex justify-content-center align-items-center"
    style={{height: window.innerHeight - 54}}>
      <Card style={{width:600}} className='p-5'>
        <h2 className="m-auto">Регистрация</h2>
        <Form className="d-flex flex-column">
        <Form.Control
              className="mt-3"
              placeholder="Введите ваше имя..."
              value = {name}
              onChange = {e=>setName(e.target.value)}
          />
          <Form.Control
              className="mt-3"
              placeholder="Введите ваш email..."
              value = {email}
              onChange = {e=>setEmail(e.target.value)}
          />
          <Form.Control
               className="mt-3"
               placeholder="Введите ваш пароль..."
               type = 'password'
               value = {password}
               onChange = {e=>setPassword(e.target.value)}  
          />
          <Button variant="outline-info" className="mt-3" onClick={signIn}>
            Зарегистрироваться
          </Button>
        </Form>
      </Card>
      
    </Container>
  );
})

export default Auth;