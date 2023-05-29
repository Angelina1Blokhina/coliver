import React, {useContext} from "react";
import {Context} from '../index';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from "react-router-dom";
import Container from "react-bootstrap/Container";
import {LOGIN_ROUTE, 
    REGISTRATION_ROUTE, 
    ACCOUNT_ROUTE, 
    POSTS_ROUTE, 
    FAVORITES_ROUTE,
    ALL_ADS_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {useHistory} from 'react-router-dom'
import {observer} from "mobx-react-lite";


const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false) 
    }
  return (
    <Navbar style={{backgroundColor:"orange"}} expand="lg">
    <Container>
        <NavLink className='fs-4' style={{color:'white', textDecorationLine: 'none'}} to={ALL_ADS_ROUTE}>Coliver</NavLink>
        {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(FAVORITES_ROUTE)} 
                        >
                            Избранное
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(POSTS_ROUTE)}
                            className="ms-2"
                        >
                            Мои объявления
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(ACCOUNT_ROUTE)}
                            className="ms-2"
                        >
                            Личный кабинет
                        </Button>
                        <Button
                            variant={"outline-light"}
                            className="ms-2"
                            onClick={logOut}
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className = "ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)} >Авторизация</Button>
                        <Button variant={"outline-light"} className = "ms-2" onClick={() => history.push(REGISTRATION_ROUTE)} >Регистрация</Button>
                    </Nav>
                    
                }
    </Container>
  </Navbar>
  );
})
/* onClick={() => history.push(LOGIN_ROUTE)} onClick={() => history.push(REGISTRATION_ROUTE)}onClick={() => logOut()*/
export default NavBar;