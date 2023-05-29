import { observer } from "mobx-react-lite"
import React, { useContext, useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Context } from '../index'
import AdItem from './AdItem'
import {fetchImages, fetchOneStation} from "../http/AdApi";

const AdList = observer(() => {

 
    const { ad } = useContext(Context);
    const [imageUrls, setImageUrls] = useState([]);
    const isFromFavorites = ad.favorites
    const isAllAds= ad.allAds
    const isPosts= ad.posts
    async function findCity(city_id) {
      console.log("find city", ad.city, ad)
      let city = ad.city.find((city) => city.id === city_id);
      await fetchOneStation(city_id).then(data=>ad.setStation(data))
      return city.city;
    }
    function findStation(station_id) {
      console.log("find station", ad.station)
      let station = ad.station.find((station) => station.id === station_id);
      return station.station;
    }
    useEffect(() => {
      const fetchData = async () => {
        const imagePromises = ad.ad.map(adItem => fetchImages(adItem.id));
        const imageResults = await Promise.all(imagePromises);
  
        const imageUrlsObject = ad.ad.reduce((acc, adItem, index) => {
          acc[adItem.id] = imageResults[index].map(image => image.img);
          return acc;
        }, {});
  
        setImageUrls(imageUrlsObject);
      };
  
      fetchData();
    }, [ad.ad]);
    return (
      <Container>
        <Row className='d-flex'>
          {ad.ad.map((ad) => {
             const imageArray = imageUrls[ad.id] || [];
             console.log("imageArray[0].id",imageArray[0])
            //let imageAd = findImages(ad.id)
            /* console.log('imageArray',imageArray)*/
            console.log('ad.ad',ad.city_id, ad.station_id) 
            let adCity = findCity(ad.city_id);
            let adStation = "Академическая";
            return <AdItem 
                    key={ad.id} 
                    ad={ad} 
                    ad_city={adCity}  
                    ad_station={adStation} 
                    image={imageArray[0]}  
                    isFromFavorites={isFromFavorites}
                    isAllAds={isAllAds}
                    isPosts={isPosts}/>;
          })}
        </Row>
      </Container>
    );
  });

export default AdList
