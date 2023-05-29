import React, {useState, useContext} from "react";
import {Context} from "../index"
import { Button, Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { login } from "../http/UserApi";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import {ALL_ADS_ROUTE} from "../utils/consts";
const Login = observer(()=> {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {user} = useContext(Context)
  const history = useHistory()
  const logIn = async () =>{
    
    try{
        const data = await login(email, password)
        user.setUser(data)
        console.log(user.user)
        user.setIsAuth(true)
        history.push(ALL_ADS_ROUTE)
    }
    catch(e){
      alert(e.response.data.message)
    }
    
  }
  

  return (
    <Container className="d-flex justify-content-center align-items-center"
    style={{height: window.innerHeight - 54}}>
      <Card style={{width:600}} className='p-5'>
        <h2 className="m-auto">Авторизация</h2>
        <Form className="d-flex flex-column">
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
          <Button variant="outline-info" className="mt-3" onClick={logIn}>
            Войти
          </Button>
        </Form>
      </Card>
      
    </Container>
  );
})

export default Login;