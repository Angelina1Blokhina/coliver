import React, { useContext } from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import {authRoutes,publicRoutes} from '../routes'
import { ALL_ADS_ROUTE } from "../utils/consts";
import {Context} from '../index';

const AppRouter = ()=> {
    const {user} = useContext(Context) //показывает авторизован пользователь или нет
  return (
    <Switch>
        {user.isAuth && authRoutes.map(({path, Component})=>
            <Route key={path} path = {path} component = {Component} exact/>
        )}

        {publicRoutes.map(({path, Component})=>
            <Route key={path} path = {path} component = {Component} exact/>
        )}
        <Redirect to={ALL_ADS_ROUTE}/>
    </Switch>
  );
}

export default AppRouter;