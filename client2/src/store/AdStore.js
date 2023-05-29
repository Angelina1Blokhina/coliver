import { makeAutoObservable } from "mobx";

export default class AdStore{
    constructor(){
        this._city = []
        this._station = []
        this._selectedCity = {}
        this._selectedStation = {}
        this._ad =[]

        this._availableRooms=[]
        this._minPrice=[]
        this._maxPrice=[]
        this._userGender=[]

        this._favorites = false
        this._posts =false
        this._allAds=false
        this._images = []
        this._page = 1
        this._totalCount = 0
        this._limit = 5
        makeAutoObservable(this)
    }

    setImages(images){
        this._images=images
    }
    setPosts(post){
        this._posts=post
    }
    setFavorites(favorite){
        this._favorites=favorite
    }
    setAllAds(allAds){
        this._allAds=allAds
    }
    setCity(city) {
        this._city = city
        
    }
    setAvailableRooms(availableRooms) {
        this._availableRooms = availableRooms  
    }
    setMinPrice(minPrice) {
        this._minPrice = minPrice    
    }
    setMaxPrice(maxPrice) {
        this._maxPrice = maxPrice    
    }
    setUserGender(userGender) {
        this._userGender = userGender    
    }

    
    setSelectedCity(city) {
        this._selectedCity = city
    }
    setStation(station) {
        this._station = station
    }
    setSelectedStation(station) {
        this._selectedStation = station
    }
    setAd(ad) {
        this._ad = ad
    }

    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get images(){
        return this._images
    }
    get city() {
        return this._city
    }
    get availableRooms(){
        return this._availableRooms
    }
    get minPrice(){
        return this._minPrice
    }
    get maxPrice(){
        return this._maxPrice
    }
    get userGender(){
        return this._userGender
    }
    get station() {
        return this._station
    }
    get ad() {
        return this._ad
    }
    get selectedCity() {
        return this._selectedCity
    }
   get selectedStation() {
        return this._selectedStation
    } 
    get favorites() {
        return this._favorites;
      }
    get allAds() {
        return this._allAds;
      }
    get posts(){
        return this._posts
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}