const WatchedEpisodes = require('../models/WatchedEpisodes');

module.exports = {
    findAllEpisodes: (req, res) => {
        WatchedEpisodes.findOne({
            where: {
                username: req.params.username
            }
        })
            .then(episodes => {
                res.json(episodes)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    },

    addAllEpisodesToWatched: async (req, res) => {
        try {
            const episodeArray = await WatchedEpisodes.findOne({ where: { username: req.body.username } });
            const newEpisodeArray = episodeArray?.dataValues.watchedEpisodes;
            const doesShowExistsInArr = newEpisodeArray?.some(show => show.show_title === req.body.show_title);

            if (episodeArray === null || episodeArray.dataValues?.watchedEpisodes === null) {
                const newEpisodeArray = await WatchedEpisodes.create({
                    username: req.body.username,
                    watchedEpisodes: [
                        {
                            show_id: req.body.show_id,
                            show_title: req.body.show_title,
                            show_poster_path: req.body.show_poster_path,
                            seasons: [
                                {
                                    season_id: req.body.season_id,
                                    season_poster_path: req.body.season_poster_path,
                                    episodes: req.body.episodes,
                                    created_at: new Date()
                                }
                            ]
                        },
                    ]
                })

                return res.json(newEpisodeArray)

            } else if (!doesShowExistsInArr) {
                const newShow = {
                    show_id: req.body.show_id,
                    show_title: req.body.show_title,
                    show_poster_path: req.body.show_poster_path,
                    seasons: [
                        {
                            season_id: req.body.season_id,
                            season_poster_path: req.body.season_poster_path,
                            episodes: req.body.episodes,
                            created_at: new Date()

                        }
                    ]
                }

                newEpisodeArray.push(newShow)

                WatchedEpisodes.update(
                    { watchedEpisodes: newEpisodeArray },
                    { where: { username: req.body.username } }
                )

                return res.json(newEpisodeArray)
            } else {
                const seasons = newEpisodeArray.find(x => x.show_id === req.body.show_id).seasons
                const currentSeason = seasons.find(season => season.season_id === req.body.season_id)

                if (!currentSeason) {
                    const newSeason = {
                        season_id: req.body.season_id,
                        season_poster_path: req.body.season_poster_path,
                        episodes: req.body.episodes,
                        created_at: new Date()
                    }

                    seasons.push(newSeason)

                } else {
                    const newEpisodes = req.body.episodes;
                    currentSeason.episodes = newEpisodes;
                    currentSeason.created_at = new Date();

                }

                WatchedEpisodes.update(
                    { watchedEpisodes: newEpisodeArray },
                    { where: { username: req.body.username } }
                )

                return res.json(newEpisodeArray)
            }
        } catch (err) {
            console.log('\x1b[33m%s\x1b[0m', err)
            res.status(500).json(err)
        }
    },

    removeAllEpisodesFromWatched: async (req, res) => {
        try {
            const episodeArray = await WatchedEpisodes.findOne({ where: { username: req.params.username } })

            const watchedEpisodes = episodeArray?.dataValues.watchedEpisodes;
            const seasons = watchedEpisodes?.find(s => s.show_id === Number(req.params.ShowId)).seasons;
            const showIndex = watchedEpisodes?.findIndex(x => x.show_id === req.params.ShowId);
            const seasonIndex = seasons?.findIndex(x => x.season_id === +req.params.SeasonId);

            seasons.splice(seasonIndex, 1);

            const checkIfItsTheLastSeason = seasons?.length === 0

            if (checkIfItsTheLastSeason) watchedEpisodes.splice(showIndex, 1)

            WatchedEpisodes.update(
                { watchedEpisodes: watchedEpisodes },
                { where: { username: req.params.username } }
            );

            return res.json(episodeArray);

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    // console.log('\x1b[33m%s\x1b[0m', log comes out with color)
    addEpisodeToWatched: async (req, res) => {
        try {
            const episodeArray = await WatchedEpisodes.findOne({ where: { username: req.body.username } })
            const newEpisodeArray = episodeArray?.dataValues.watchedEpisodes
            const doesShowExistsInArr = newEpisodeArray?.some(show => show.show_title === req.body.show_title)

            // console.dir(object, { depth: null, color: true })
            if (episodeArray === null || episodeArray.dataValues?.watchedEpisodes === null) {
                const newEpisodeArray = await WatchedEpisodes.create({
                    username: req.body.username,
                    watchedEpisodes: [
                        {
                            show_id: req.body.show_id,
                            show_title: req.body.show_title,
                            show_poster_path: req.body.show_poster_path,
                            seasons: [
                                {
                                    season_id: req.body.season_id,
                                    season_poster_path: req.body.season_poster_path,
                                    episodes: [
                                        {
                                            id: req.body.id,
                                            episode_number: req.body.episode_number,
                                            name: req.body.name,
                                            runtime: req.body.runtime,
                                            season_number: req.body.season_id
                                        }
                                    ],
                                    created_at: new Date(),
                                    last_watched: [
                                        {
                                            episode_number: req.body.episode_number,
                                            season_number: req.body.season_id,
                                            date: new Date()
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                })

                return res.json(newEpisodeArray)

            } else if (!doesShowExistsInArr) {
                const newShow = {
                    show_id: req.body.show_id,
                    show_title: req.body.show_title,
                    show_poster_path: req.body.show_poster_path,
                    seasons: [
                        {
                            season_id: req.body.season_id,
                            season_poster_path: req.body.season_poster_path,
                            episodes: [
                                {
                                    id: req.body.id,
                                    episode_number: req.body.episode_number,
                                    name: req.body.name,
                                    runtime: req.body.runtime,
                                    season_number: req.body.season_id
                                }
                            ],
                            created_at: new Date(),
                            last_watched: [
                                {
                                    episode_number: req.body.episode_number,
                                    season_number: req.body.season_id,
                                    date: new Date()
                                }
                            ]
                        }
                    ]
                }

                newEpisodeArray.push(newShow)

                WatchedEpisodes.update(
                    { watchedEpisodes: newEpisodeArray },
                    { where: { username: req.body.username } }
                )

                return res.json(newEpisodeArray)
            } else {
                const seasons = newEpisodeArray.find(x => x.show_id === req.body.show_id).seasons
                const currentSeason = seasons.find(season => season.season_id === req.body.season_id)
                const episodesToBeUpdated = seasons.find(x => x.season_id === req.body.season_id)?.episodes

                if (episodesToBeUpdated?.some(x => x.episode_number === req.body.episode_number)) {
                    return res.status(400).json({ message: 'This episode is already in your watched episodes list!' })
                } else if (!currentSeason) {
                    const newSeason = {
                        season_id: req.body.season_id,
                        season_poster_path: req.body.season_poster_path,
                        episodes: [
                            {
                                id: req.body.id,
                                episode_number: req.body.episode_number,
                                name: req.body.name,
                                runtime: req.body.runtime,
                                season_number: req.body.season_id,
                            }
                        ],
                        created_at: new Date(),
                        last_watched: [
                            {
                                episode_number: req.body.episode_number,
                                season_number: req.body.season_id,
                                date: new Date()
                            }
                        ]
                    }

                    seasons.push(newSeason)

                } else {
                    const newEpisode = {
                        episode_number: req.body.episode_number,
                        id: req.body.id,
                        name: req.body.name,
                        runtime: req.body.runtime,
                        season_number: req.body.season_id
                    }

                    currentSeason.updated_at = new Date()
                    currentSeason.last_watched = [
                        {
                            episode_number: req.body.episode_number,
                            season_number: req.body.season_id,
                            date: new Date()
                        }
                    ]
                    currentSeason.episodes.push(newEpisode)
                }

                WatchedEpisodes.update(
                    { watchedEpisodes: newEpisodeArray },
                    { where: { username: req.body.username } }
                )

                return res.json(newEpisodeArray)
            }

        } catch (err) {
            console.log('\x1b[33m%s\x1b[0m', err)
            res.status(500).json(err)
        }
    },

    removeEpisodeFromWatched: async (req, res) => {
        try {
            const episodeArray = await WatchedEpisodes.findOne({ where: { username: req.params.username } })

            const watchedEpisodes = episodeArray?.dataValues.watchedEpisodes;
            const seasons = watchedEpisodes?.find(s => s.show_id === Number(req.params.ShowId)).seasons;
            const episodes = seasons?.find(x => x.season_id === Number(req.params.SeasonId)).episodes;

            const showIndex = watchedEpisodes?.findIndex(x => x.show_id === req.params.ShowId);
            const episodesIndex = episodes.findIndex(x => x.episode_number === +req.params.Episode);

            episodes.splice(episodesIndex, 1);
            const checkIfItsTheLastEpisode = !seasons.map(x => x.episodes.length === 0).some(y => y === false);

            if (checkIfItsTheLastEpisode) watchedEpisodes.splice(showIndex, 1);

            WatchedEpisodes.update(
                { watchedEpisodes: watchedEpisodes },
                { where: { username: req.params.username } }
            );

            return res.json(episodeArray);

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    increaseShowRewatched: async (req, res) => {
        try {
            const episodeArray = await WatchedEpisodes.findOne({ where: { username: req.body.username } })
            const newEpisodeArray = episodeArray?.dataValues.watchedEpisodes
            const doesShowExistsInArr = newEpisodeArray?.some(show => show.show_title === req.body.show_title)

            if (!newEpisodeArray) return
            if (!doesShowExistsInArr) return

            const indexOfTheShow = newEpisodeArray.findIndex(x => x.show_id === req.body.show_id)

            if (!newEpisodeArray[indexOfTheShow].rewatch_count) {
                // setting this to 2 bcuz it'll start from 1 anyways
                newEpisodeArray[indexOfTheShow].rewatch_count = 2
                newEpisodeArray[indexOfTheShow].last_rewatched = new Date()
            } else {
                newEpisodeArray[indexOfTheShow].rewatch_count = newEpisodeArray[indexOfTheShow].rewatch_count + 1
                newEpisodeArray[indexOfTheShow].last_rewatched = new Date()
            }

            WatchedEpisodes.update(
                { watchedEpisodes: newEpisodeArray },
                { where: { username: req.body.username } }
            )

            return res.json(newEpisodeArray)

        } catch (err) {
            console.log('\x1b[33m%s\x1b[0m', err)
            res.status(500).json(err)
        }
    },

    decreaseShowRewatched: async (req, res) => {
        try {
            const episodeArray = await WatchedEpisodes.findOne({ where: { username: req.body.username } })
            const newEpisodeArray = episodeArray?.dataValues.watchedEpisodes
            const doesShowExistsInArr = newEpisodeArray?.some(show => show.show_title === req.body.show_title)

            if (!newEpisodeArray) return
            if (!doesShowExistsInArr) return

            const indexOfTheShow = newEpisodeArray.findIndex(x => x.show_id === req.body.show_id)

            if (newEpisodeArray[indexOfTheShow].rewatch_count !== 1) newEpisodeArray[indexOfTheShow].rewatch_count = newEpisodeArray[indexOfTheShow].rewatch_count - 1

            WatchedEpisodes.update(
                { watchedEpisodes: newEpisodeArray },
                { where: { username: req.body.username } }
            )

            return res.json(newEpisodeArray)

        } catch (err) {
            console.log('\x1b[33m%s\x1b[0m', err)
            res.status(500).json(err)
        }
    }
}