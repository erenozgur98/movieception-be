const router = require('express').Router();
const historyController = require('../../controllers/HistoryController');

router.route('/watched').get(historyController.findAllHistory);

router.route('/add-movie-to-history').post(historyController.addMovieToHistory);
router.route('/add-show-to-history').post(historyController.addShowToHistory);

router.route('/remove-movie-from-history/:MovieId').delete(historyController.deleteMovieFromHistory);
router.route('/remove-show-from-history/:ShowId').delete(historyController.deleteShowFromHistory);

router.route('/update-show').put(historyController.updateShowFromHistory);

module.exports = router;