const router = require('express').Router();
const watchListController = require('../../controllers/WatchListController');

router.route('/').get(watchListController.findAllWatchList);

router.route('/add-movie-to-watchlist').post(watchListController.addMovieToWatchList);
router.route('/add-show-to-watchlist').post(watchListController.addShowToWatchList);

router.route('/remove-movie-from-watchlist/:MovieId').delete(watchListController.deleteMovieFromWatchList);
router.route('/remove-show-from-watchlist/:ShowId').delete(watchListController.deleteShowFromWatchList);

router.route('/update-movie').put(watchListController.updateMovieFromWatchList);

module.exports = router;