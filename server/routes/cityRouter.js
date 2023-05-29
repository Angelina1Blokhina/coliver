const Router = require('express');
const router = new Router();
const cityController = require('../controllers/cityController');

router.get('/onecity/:id', cityController.getCity)
router.get('/onestation/:id', cityController.getStation);
router.get('/', cityController.getAllCity)
router.get('/station', cityController.getAllCityStation);

module.exports = router