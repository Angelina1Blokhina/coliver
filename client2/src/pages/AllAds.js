import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import AdList from "../components/AdList";
import Pages from "../components/Pages"
import FilterBar from "../components/FilterBar";
import {Col, Row} from "react-bootstrap"
import {fetchAds, fetchCity, fetchImages, fetchStation} from "../http/AdApi";

import { Context } from "..";
const AllAds = observer(()=> {
  const {ad} = useContext(Context)

  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [available_rooms, setAvailableRooms] = useState();
  const [usergender, setUserGender] = useState();
  

  //const [isFromFavorites, setIsFromFavorites] = useState(undefined);

  useEffect(() => {
    fetchAds(null, null, null, null, null, null,  2, 1).then(data => {
      ad.setAd(data.rows)
      ad.setTotalCount(data.count)
      ad.setFavorites(false)
      ad.setAllAds(true)
      ad.setPosts(false)
    })
}, [])
useEffect(() => {
  console.log('ad/pge', ad.page)
  fetchAds(ad.availableRooms, ad.minPrice,ad.maxPrice, ad.selectedCity.id, ad.selectedStation.id, ad.userGender,  ad.page, 1).then(data => {
      ad.setAd(data.rows)
      ad.setTotalCount(data.count)
      ad.setFavorites(false)
      ad.setAllAds(true)
      ad.setPosts(false)
  })
}, [ad.page,  ad.selectedCity, ad.selectedStation])
  

  return (
  <Col>
    <FilterBar/>
    <AdList /> 
    <Pages/>
  </Col>
    
  );
})



export default AllAds;