const router = require('express').Router();
const WatchedEpisodesController = require('../../controllers/WatchedEpisodesController');

router.route('/:username/episodes').get(WatchedEpisodesController.findAllEpisodes);

router.route('/allwatchedepisodes').post(WatchedEpisodesController.addAllEpisodesToWatched);
router.route('/').post(WatchedEpisodesController.addEpisodeToWatched);
router.route('/:username/show/:ShowId/show_title/:ShowTitle/season/:SeasonId/episode/:Episode/:EpisodeId').delete(WatchedEpisodesController.removeEpisodeFromWatched);
router.route('/:username/show/:ShowId/show_title/:ShowTitle/season/:SeasonId').delete(WatchedEpisodesController.removeAllEpisodesFromWatched);
router.route('/increase-rewatched').post(WatchedEpisodesController.increaseShowRewatched);
router.route('/decrease-rewatched').post(WatchedEpisodesController.decreaseShowRewatched);

module.exports = router;