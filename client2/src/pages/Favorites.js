import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Context } from '../index'
import AdItem from '../components/AdItem'
import {fetchFavorites, fetchStation, fetchCity} from "../http/AdApi";
import AdList from "../components/AdList"

const Favorites = ()=> {
  const {ad} = useContext(Context)
  console.log('first-ad',ad.ad)
  const {user} = useContext(Context)
 // const [isFromFavorites, setIsFromFavorites] = useState(false);
   //const isFromFavorites
   useEffect(()=>{
    fetchCity().then(data => ad.setCity(data))
    fetchStation(ad.city.id).then(data =>ad.setStation(data)) 
},[]) 
  useEffect(() => {
    fetchFavorites(user.user.id).then(data => { console.log("Fav-data",data)
      ad.setAd(data)
      ad.setFavorites(true);
      ad.setAllAds(false)
      ad.setPosts(false)
    })
  
}, [user.user])
/* function findCity(city_id) {
  let city = ad.city.find((city) => city.id === city_id);
  return city.city;
}
function findStation(station_id) {
  let station = ad.station.find((station) => station.id === station_id);
  return station.station;
}
async function fetchAdImages(ad_id) {
  try {
    const images = await fetchImages(ad_id);
    return images.map(image => image.img);
  } catch (error) {
    console.error('Error fetching ad images:', error);
    return [];
  }
} */

  return (
  <Container>
    
    <AdList />
  </Container>
  );
}

export default Favorites;