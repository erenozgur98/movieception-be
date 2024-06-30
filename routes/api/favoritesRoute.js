const router = require('express').Router();
const favoritesController = require('../../controllers/FavoritesController');

router.route('/').get(favoritesController.findAllFavorites);

router.route('/add-movie-to-favorites').post(favoritesController.addMovieToFavorite);
router.route('/add-show-to-favorites').post(favoritesController.addShowToFavorite);

router.route('/remove-movie-from-favorites/:MovieId').delete(favoritesController.deleteMovieFromFavorites);
router.route('/remove-show-from-favorites/:ShowId').delete(favoritesController.deleteShowFromFavorites);

module.exports = router;