const ApiError = require('../error/ApiError')
const {City, SubwayStation} = require('../models/models.js')

class CityController{
    async getCity(req,res){
        const {id}=req.params
        const city = await City.findOne({where:{id}})
        return res.json(city)
    }
    async getStation(req,res){
        console.log('getStation',req.params)
        const {id}=req.params
        const station = await SubwayStation.findOne({where:{id}})
        return res.json(station)
    }
    async getAllCity(req,res){
        const city = await City.findAll()
        return res.json(city)
    }
    async getAllCityStation(req,res){
        let {city_id} = req.query;
        let stations;
        if (city_id){
            stations = await SubwayStation.findAll({where:{city_id}})
            
        }
        else{
            stations = await SubwayStation.findAll()
        }
        return res.json(stations)
        
       
    }
}
module.exports=new CityController()