const ApiError = require('../error/ApiError')
const {Account, Ad, Favorites} = require('../models/models')
const { Op } = require('sequelize');
class FavoritesController{
    async getFavorites(req,res){
        try{
            console.log(req.query)
            const {account_id} = req.query
            const favorites = await Favorites.findAll({where:{account_id: account_id}})
            console.log('getFavorites',favorites.length === 0)

            if (!favorites || favorites.length === 0) {
              return res.json([]);
            }
            const adIds = favorites.map(item => item.ad_id);
            console.log("adIds",adIds)
            const ads = await Ad.findAll({ where: { id: { [Op.in]: adIds } } });
            console.log(ads)
            return res.json(ads)
        }
        catch(error){
           return res.status(400).json({ message: error.message });
        }
        
    }
    async addToFavorites(req,res){
        console.log('Fav')
        console.log(req.body)
        const {account_id, ad_id } = req.body;
        try {
            const existingFavorite = await Favorites.findOne({ where:{account_id: account_id, ad_id: ad_id}});
            if (existingFavorite) {
             
                return res.status(400).json({ message: 'Уже добавлено в избранное'});
            }
            const favorite = await Favorites.create({account_id, ad_id});
            return res.json(favorite);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
      }
          
    async deleteOne(req,res){
        
        try {
            const {account_id, ad_id} = req.body;
            const favorite = await Favorites.findOne({ account_id: account_id, ad_id: ad_id });
            await favorite.destroy();
        } catch (error) {
           return res.status(400).json({ message: error.message });
  }
    }
    async deleteAll(req,res){
        try {
            const {account_id} = req.params;
            const favorites = await Favorites.findAll({where: {account_id:account_id}});
              await Promise.all(favorites.map(favorite => favorite.destroy()));
        } catch (error) {
           return res.status(400).json({ message: error.message });
        }
            }
}
module.exports= new FavoritesController()