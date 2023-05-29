import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (name, email, password) => {
    const {data} = await $host.post('api/user/registration', {name, email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
    
} 

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)  
     
}


export const updateAccount = async (items) =>{
    const {data} = await $authHost.put('api/user/account', items )
    return data
}

export const getAccount = async (id) =>{
    const {data} = await $authHost.get('api/user/account',{params: { id}})
    return data
}