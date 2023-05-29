const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const cityRouter = require('./cityRouter')
const adRouter = require('./adRouter')
const favoritesRouter = require('./favoritesRouter')



router.use('/user', userRouter)

router.use('/ad', adRouter)

router.use('/city', cityRouter)

router.use('/favorites', favoritesRouter)


module.exports = router