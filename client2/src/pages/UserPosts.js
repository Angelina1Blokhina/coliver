
import { observer } from "mobx-react-lite";
import React,{useContext, useState, useEffect} from "react";
import { Container} from "react-bootstrap";
import { Context } from "../index";
import AdList from '../components/AdList'
import { fetchPost, fetchCity, fetchStation} from "../http/AdApi";

const UserPosts = ()=> {
  const {ad}=useContext(Context)
  const {user} =useContext(Context)
  useEffect(()=>{
    fetchCity().then(data => ad.setCity(data))
    fetchStation(ad.city.id).then(data =>ad.setStation(data)) 
},[]) 
 
  useEffect(()=>{
    fetchPost(user.user.id).then(data =>{ ad.setAd(data)
    ad.setFavorites(false);
    ad.setAllAds(false)
    ad.setPosts(true)
  
    })
},[user.user])


  return (
    <Container>
        <AdList/>
      </Container>
  );
}

export default UserPosts;