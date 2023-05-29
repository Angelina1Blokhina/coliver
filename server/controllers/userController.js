const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Account, Favorites} = require('../models/models')

//Функция для генерации токенов
const generateJwt = (id, email, name) => {
    return jwt.sign(
        {id, email, name},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}


class UserController{
    async registration(req,res, next){
        const {name,email,password} = req.body
        if (!email || !password){
            return next(ApiError.badRequest('Неккоректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({name, email, password: hashPassword})
        const account = await Account.create({id: user.id, user_id:user.id})
       // const post = await Posts.create({account_id:account.id})
        const token = generateJwt(user.id, user.email, user.name)
        return res.json({token})
    }


    async login(req,res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.name)
        return res.json({message:"Good", token})
        
    }
    async check(req,res, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.name)
        return res.json({token})
    }
  
    
    async updateProfile(req, res, next) {
        const { age, gender, phone, user_id } = req.body;
        try {
          const account = await Account.update({ age, gender, phone }, { where: { user_id } });
          if (!account[0]) {
            return next(ApiError.notFound('Аккаунт не найден'));
          }
          return res.json(account);
        } catch (err) {
          return next(ApiError.internalServerError('Ошибка сервера'));
        }
      }

    async getAccount(req, res, next){
        const {id} = req.query
        try {
            const account = await Account.findOne({where: {id} })
            return res.json(account);
        }
        catch (err) {
           return next(ApiError.internalServerError('Ошибка сервера'));
      }
    
    }
}
module.exports=new UserController()