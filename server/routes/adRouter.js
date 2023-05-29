const Router = require('express');
const router = new Router();
const addController = require('../controllers/adController')
const authMiddleware = require('../middleware/authMiddleware')
const fileUpload = require('../middleware/filesUpload')


  
router.post('/',authMiddleware,fileUpload.array('image'), addController.create)
router.get('/', addController.getAll)
router.get('/oneAd/:id', addController.getOne)
router.get('/images', addController.getImages)
//router.get('/image', addController.getImages)
router.get('/post', authMiddleware, addController.getUsersPosts )
router.delete('/:id',authMiddleware, addController.deleteOne)
router.delete('/',authMiddleware, addController.deleteAll)
module.exports = router