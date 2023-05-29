const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type:DataTypes.STRING, allowNull:false},
    email: {type: DataTypes.STRING,allowNull:false, unique: true},
    password: {type: DataTypes.STRING, allowNull:false}
})



const Account = sequelize.define('account', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id:{type:DataTypes.INTEGER, allowNull:false},
    age:{type:DataTypes.INTEGER},
    gender: {type: DataTypes.STRING}, 
    phone:{type:DataTypes.INTEGER}   
})


const Favorites = sequelize.define('favorites', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ad_id:{type:DataTypes.INTEGER, allowNull:false},
    account_id:{type:DataTypes.INTEGER, allowNull:false}
    
})

const Posts = sequelize.define('posts', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ad_id:{type:DataTypes.INTEGER, allowNull:false},
    account_id:{type:DataTypes.INTEGER, allowNull:false}
})


const Ad = sequelize.define('ad', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    account_id:{type:DataTypes.INTEGER},
    title:{type: DataTypes.STRING, allowNull: false},
    count_view: {type: DataTypes.INTEGER, allowNull: false, defaultValue:0},
    available_rooms:{type:DataTypes.INTEGER, allowNull:false},
    price:{type:DataTypes.INTEGER, allowNull:false},
    age_coliver_start:{type: DataTypes.INTEGER},
    age_coliver_end:{type: DataTypes.INTEGER},
    gender_coliver:{type: DataTypes.STRING},
    username:{type:DataTypes.STRING},
    city_id:{type: DataTypes.INTEGER, allowNull:false},
    station_id:{type: DataTypes.INTEGER},
    usergender:{type: DataTypes.STRING},
    userage:{type: DataTypes.INTEGER},
    discription: {type: DataTypes.STRING},
    rooms_count: {type: DataTypes.STRING},
    address:{type: DataTypes.STRING},
    contact_phone:{type:DataTypes.STRING},
    contact_email:{type: DataTypes.STRING}

})


const Images = sequelize.define('images',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ad_id:{type:DataTypes.INTEGER},
    img:{type:DataTypes.STRING, allowNull:false}
})
const City = sequelize.define('city',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    city:{type:DataTypes.STRING, allowNull:false}
})
const SubwayStation = sequelize.define('subway',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    city_id:{type:DataTypes.INTEGER, allowNull:false},
    station:{type:DataTypes.STRING, allowNull:false},
    
})



User.hasOne(Account)
Account.belongsTo(User)



Account.hasMany(Posts)
Posts.belongsTo(Account)

Account.hasMany(Favorites)
Favorites.belongsTo(Account)

Ad.hasOne(Posts)
Posts.belongsTo(Ad)

Ad.hasMany(Favorites)
Favorites.belongsTo(Ad)



Ad.hasOne(Images, {as: 'images'});
Images.belongsTo(Ad)

Ad.hasOne(City)
City.belongsTo(Ad)

Ad.hasMany(SubwayStation)
SubwayStation.belongsTo(Ad)

City.hasMany(SubwayStation)
SubwayStation.belongsTo(City)

module.exports={
    User,
    Account,
    Favorites,
    Posts,
    Ad,
    Images,
    City,
    SubwayStation
  
}