import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Row, Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { Context } from "./index";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { check } from "./http/UserApi"

const App = observer(() =>{
  const {user} =useContext(Context)
 
  const [loading, setLoading] = useState(true)
  useEffect(() =>{
    check().then(data=>{
      user.setUser(data)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])
  
  if (loading){
    return <Spinner animation={"grown"}/>
  }

  return (
    <BrowserRouter>
    <Row>
      <NavBar/>
    </Row>
    <Row>
      <AppRouter />
    </Row>
    
    </BrowserRouter>
  );
})

export default App;
