const sequelize = require('../config/connection');

const { User, Favorites, History, WatchList, WatchedEpisodes } = require('../models');

const userSeedData = require('./userSeedData.json');
const historySeedData = require('./historySeedData.json');
const favoriteSeedData = require('./favoriteSeedData.json');
const watchListSeedData = require('./watchListSeedData.json');
const watchedEpisodesSeedData = require('./watchedEpisodesSeedData.json');

const seed = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userSeedData);
    await History.bulkCreate(historySeedData);
    await Favorites.bulkCreate(favoriteSeedData);
    await WatchList.bulkCreate(watchListSeedData);
    await WatchedEpisodes.bulkCreate(watchedEpisodesSeedData);

    process.exit(0);
}

seed();