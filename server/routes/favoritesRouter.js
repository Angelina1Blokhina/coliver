const Router = require('express');
const router = new Router();
const favoriteController = require('../controllers/favoritesController')
const authMiddleware = require('../middleware/authMiddleware')

// Получить список избранных товаров
router.get('/', authMiddleware,favoriteController.getFavorites);
// Добавить товар в избранное
router.post('/',authMiddleware, favoriteController.addToFavorites);
// Удалить один товар из избранного
router.delete('/deleteOne',authMiddleware, favoriteController.deleteOne);
// Удалить все товары из избранного
router.delete('/:account_id',authMiddleware, favoriteController.deleteAll);


module.exports = router