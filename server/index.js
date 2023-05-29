require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors= require('cors')
//const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')


const PORT = process.env.PORT || 3005;
const app = express();
app.use(express.static(__dirname));
app.use(cors())
app.use(express.json())
//app.use(fileUpload({}))
app.use('/api', router)
//Обработка ошибокб последний Middleware
app.use(errorHandler)
// app.get('/', (req,res)=>{
//     res.status(200).json({message:'Working!!!'})
// })


const start =async ()=>{
        try{
            await sequelize.authenticate();
            await sequelize.sync();
            app.listen(PORT, ()=>console.log(`Server started on port: ${PORT}`))
        } catch(e){
            console.log(e);
        }
    }
start()
