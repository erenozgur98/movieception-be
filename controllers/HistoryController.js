const History = require("../models/History");

module.exports = {
    findAllHistory: (req, res) => {
        History.findOne({
            where: {
                username: req.body.username
            }
        })
            .then(favorites => {
                res.json(favorites)
            })
            .catch(err => {
                console.log(err)
            })
    },

    addMovieToHistory: async (req, res) => {
        try {
            const historyArray = await History.findOne({ where: { username: req.body.username } });

            if (historyArray?.dataValues.showHistory !== null && historyArray?.dataValues.movieHistory === null) {
                const newMovieHistory = await History.update(
                    {
                        movieHistory: [
                            {
                                id: req.body.MovieId,
                                title: req.body.Title,
                                poster_path: req.body.PosterPath,
                                genres: req.body.Genres,
                                created_at: new Date()
                            }
                        ]
                    },
                    { where: { username: req.body.username } }
                );
                return res.json(newMovieHistory)
            } else if (historyArray === null || historyArray?.dataValues?.movieHistory === null) {
                const newMovieHistory = await History.create({
                    username: req.body.username,
                    movieHistory: [
                        {
                            id: req.body.MovieId,
                            title: req.body.Title,
                            poster_path: req.body.PosterPath,
                            genres: req.body.Genres,
                            created_at: new Date()
                        }
                    ]
                });
                return res.json(newMovieHistory);
            } else {
                let movieArray = historyArray?.dataValues.movieHistory;
                if (movieArray?.some(e => e.id === req.body.MovieId)) {
                    return res.status(400).json({ message: 'That movie is already in your favorites!' });
                } else {
                    const newMovieHistory = {
                        id: req.body.MovieId,
                        title: req.body.Title,
                        poster_path: req.body.PosterPath,
                        genres: req.body.Genres,
                        created_at: new Date()
                    };

                    movieArray.push(newMovieHistory);

                    History.update(
                        { movieHistory: movieArray },
                        { where: { username: req.body.username } }
                    )

                    res.json(movieArray)
                }

            }

        } catch (err) {
            console.dir(err, { depth: null, colors: true })
            res.status(500).json(err)
        }

    },

    addShowToHistory: async (req, res) => {
        try {
            const historyArray = await History.findOne({ where: { username: req.body.username } });

            if (historyArray?.dataValues.movieHistory !== null && historyArray?.dataValues.showHistory === null) {
                const newShowFavorite = await History.update(
                    {
                        showHistory: [
                            {
                                id: req.body.ShowId,
                                title: req.body.Title,
                                poster_path: req.body.PosterPath,
                                genres: req.body.Genres,
                                NumberOfEpisodes: req.body.NumberOfEpisodes,
                                NumberOfSeasons: req.body.NumberOfSeasons,
                                created_at: new Date()
                            }
                        ]
                    },
                    { where: { username: req.body.username } }
                );
                return res.json(newShowFavorite)
            } else if (historyArray === null || historyArray?.dataValues?.showHistory === null) {
                const newShowFavorite = await History.create({
                    username: req.body.username,
                    showHistory: [
                        {
                            id: req.body.ShowId,
                            title: req.body.Title,
                            poster_path: req.body.PosterPath,
                            genres: req.body.Genres,
                            NumberOfEpisodes: req.body.NumberOfEpisodes,
                            NumberOfSeasons: req.body.NumberOfSeasons,
                            created_at: new Date()
                        }
                    ]
                });
                return res.json(newShowFavorite);
            } else {
                let showArray = historyArray?.dataValues.showHistory;
                if (showArray?.some(e => e.id === req.body.ShowId)) {
                    return res.status(400).json({ message: 'That movie is already in your favorites!' });
                } else {
                    const newShowHistory = {
                        id: req.body.ShowId,
                        title: req.body.Title,
                        poster_path: req.body.PosterPath,
                        genres: req.body.Genres,
                        NumberOfEpisodes: req.body.NumberOfEpisodes,
                        NumberOfSeasons: req.body.NumberOfSeasons,
                        created_at: new Date()
                    };

                    showArray.push(newShowHistory);

                    History.update(
                        { showHistory: showArray },
                        { where: { username: req.body.username } }
                    )

                    res.json(showArray)
                }

            }

        } catch (err) {
            console.log('\x1b[33m%s\x1b[0m', err)
            res.status(500).json(err)
        }
    },

    deleteMovieFromHistory: async (req, res) => {
        try {
            const historyArray = await History.findOne({ where: { username: req.params.username } });

            const movieArray = historyArray?.dataValues.movieHistory;
            const index = movieArray.findIndex(x => +x.id === +req.params.MovieId);
            if (index <= -1) return res.sendStatus(409)
            movieArray.splice(index, 1);

            History.update(
                { movieHistory: movieArray },
                { where: { username: req.params.username } }
            );

            res.json(historyArray);

        } catch (err) {
            res.status(500).json(err)
        }
    },

    deleteShowFromHistory: async (req, res) => {
        try {
            const historyArray = await History.findOne({ where: { username: req.params.username } });
            console.dir(req.params, { depth: null, colors: true })

            const showArray = historyArray?.dataValues.showHistory;
            const index = showArray.findIndex(x => +x.id === +req.params.ShowId);
            if (index <= -1) return res.sendStatus(409)
            showArray.splice(index, 1);

            History.update(
                { showHistory: showArray },
                { where: { username: req.params.username } }
            );

            res.json(historyArray);

        } catch (err) {
            res.status(500).json(err)
        }
    },

    updateShowFromHistory: async (req, res) => {
        try {
            const historyArray = await History.findOne({ where: { username: req.body[0].username } });
            const showArray = historyArray?.dataValues?.showHistory

            if (!showArray) return res.status(404)

            req.body?.forEach(s => {
                if (!s) return
                const index = showArray?.findIndex(x => +x.id === +s.ShowId)
                showArray[index].NumberOfEpisodes = s.NumberOfEpisodes
                showArray[index].NumberOfSeasons = s.NumberOfSeasons
            })

            History.update(
                { showHistory: showArray },
                { where: { username: req.body[0].username } }
            )

            return res.json(showArray)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}
