const ApiError = require('../error/ApiError')
const {User, Ad, Account, Images} = require('../models/models.js')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs');
const axios = require('axios')
const fetch = require('node-fetch');
class AdController{
    async create(req,res){
        console.log(req.body)
        try{
            
            const {account_id,title, available_rooms, price, age_coliver_start, age_coliver_end, gender_coliver, city_id, station_id,  rooms_count, address, discription}= req.body;
            let image=req.files
            console.log(req.files)
           
            const user = await User.findOne({where:{id:account_id}})
            const account = await Account.findOne({where: {id:account_id}})

            const ad = await Ad.create({
                account_id:account.id,
                username: user.name,
                usergender: account.gender,
                userage: account.age,
                contact_phone:account.phone,
                contact_email:user.email,
                
                title, available_rooms, price, age_coliver_start, age_coliver_end, gender_coliver, city_id, station_id, rooms_count, address, discription})
                
                if (image) {
                    image.map(async (i) => {
                        await Images.create({
                            ad_id: ad.id,
                            img: i.filename,
                        });
                     })
                    };

                  return res.json(ad);
        }
        catch(error){
            console.error(error);

        }
        
    }
   
    async getImages(req, res){
        const {id}=req.query
        const images = await Images.findAll({where: {ad_id:id}})
        return res.json(images) 
    }
   /*  async getImages(req, res){
        
        const images = await Images.findAll()
        return res.json(images) 
    } */

    async getAll(req,res){
        try{
            let {available_rooms, minPrice,maxPrice, city_id, station_id, usergender,  limit, page} = req.query
            console.log(req.query)
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit
            const where = {};
            if (available_rooms) {
                where.available_rooms = available_rooms;
            }
            if (minPrice && maxPrice) {
                where.price = {
                  $gte: minPrice,
                  $lte: maxPrice
                };
              }
          
            if (city_id) {
                where.city_id = city_id;
            }
            if (station_id) {
                where.station_id = station_id;
            }
            if (usergender) {
                where.usergender = usergender;
            }
            
            const ad = await Ad.findAndCountAll({where,limit,offset});
            return res.json(ad)
    }
        catch(error){

        }

    }
    async getOne(req,res){
        
        const {id} = req.params
        console.log('getOneAd', id)
        const ad = await Ad.findOne({where: {id}}
        )
        return res.json(ad)
    
    }
    async getUsersPosts(req,res){
        try{
            const {account_id} = req.query
            const post = await Ad.findAll({where: {account_id}});
            return res.json(post)
    }
        catch(error){

       }
    }
    
    async deleteAll(req,res, next){
        const {account_id} = req.body
        if (!account_id){
           return next(ApiError.badRequest('Не задан id'))
        }
        const posts = await Ad.deleteAll({where: account_id})
        return res.json({ message: 'Успешно удалено' })
    }

    async deleteOne(req,res, next){
        const {id} = req.params
        console.log(id)
        if (!id){
           return next(ApiError.badRequest('Не задан id'))
        }
        const posts = await Ad.destroy({where: {id}})
       return res.json({ message: 'Успешно удалено' })
    }

}
module.exports=new AdController()