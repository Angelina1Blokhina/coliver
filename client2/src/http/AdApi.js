import {$authHost, $host} from "./index";


export const createAd = async (ad) => {
    console.log(ad)
    const {data} = await $authHost.post('api/ad', ad)
    return data
}

export const fetchAds = async (available_rooms, minPrice, maxPrice, city_id, station_id, usergender, page, limit= 1) => {
    const {data} = await $host.get('api/ad', {params: {
        available_rooms, minPrice, maxPrice, city_id, station_id, usergender, page, limit
        }})
    return data
}

export const fetchOneAd = async (id) => {
    console.log('fetchOneAdID', id)
    const {data} = await $host.get('api/ad/oneAd/' + id)
    console.log(data)
    return data
}
export const fetchImages = async (id) => {
    const {data} = await $host.get('api/ad/images',{params: {id}} )
    return data
}

export const daeleteOneAd = async(id)=>{
    const {data} = await $authHost.delete('api/ad/' + id)
    return data
}
export const fetchOneCity = async (id) => {
    const {data} = await $host.get('api/city/onecity/'+id)
    return data 
} 
export const fetchOneStation = async (id) => {
    const {data} = await $host.get('api/city/onestation/'+id)
    return data 
} 

export const fetchCity = async () => {
    const {data} = await $host.get('api/city')
    return data 
} 
export const fetchStation = async (city_id) => {
    //console.log(city_id)
    const { data } = await $host.get(`api/city/station`,{params: { city_id}});
    //console.log(data)
    return data 
} 

export const putFavorites =async(account_id, ad_id)=>{
    const {data} =  await $authHost.post('api/favorites',{account_id, ad_id})
    return data 
}

export const fetchFavorites = async (account_id ) =>{
    console.log('fav-uId', account_id)
    const { data } = await $authHost.get(`api/favorites`, {params:{account_id}});
    return data 
}

export const deleteFavorites = async(ad_id, account_id)=>{
    const { data } = await $authHost.delete(`api/favorites/deleteOne`, ad_id,account_id);
    return data 
}

export const fetchPost = async (account_id ) =>{
    const { data } = await $authHost.get(`api/ad/post`,{params:{ account_id}});
    return data 
}
