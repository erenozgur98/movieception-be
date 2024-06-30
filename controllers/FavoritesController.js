const Favorites = require("../models/Favorites");

module.exports = {
    findAllFavorites: (req, res) => {
        Favorites.findOne({
            where: {
                username: req.session.username
            }
        })
            .then(favorites => {
                res.json(favorites)
            })
            .catch(err => {
                console.log(err)
            })
    },

    addMovieToFavorite: async (req, res) => {
        try {
            const favoritesArray = await Favorites.findOne({ where: { username: req.session.username } });

            if (favoritesArray?.dataValues.showFavorites !== null && favoritesArray?.dataValues.movieFavorites === null) {
                const newMovieFavorite = await Favorites.update(
                    {
                        movieFavorites: [
                            {
                                id: req.body.MovieId,
                                title: req.body.Title,
                                poster_path: req.body.PosterPath,
                                genres: req.body.Genres,
                                created_at: new Date()
                            }
                        ]
                    },
                    { where: { username: req.session.username } }
                );
                return res.json(newMovieFavorite)
            } else if (favoritesArray === null || favoritesArray?.dataValues?.movieFavorites === null) {
                const newMovieFavorite = await Favorites.create({
                    username: req.session.username,
                    movieFavorites: [
                        {
                            id: req.body.MovieId,
                            title: req.body.Title,
                            poster_path: req.body.PosterPath,
                            genres: req.body.Genres,
                            created_at: new Date()
                        }
                    ]
                });
                return res.json(newMovieFavorite);
            } else {
                let movieArray = favoritesArray?.dataValues.movieFavorites;
                if (movieArray?.some(e => e.id === req.body.MovieId)) {
                    return res.status(400).json({ message: 'That movie is already in your favorites!' });
                } else {
                    const newFavoriteMovie = {
                        id: req.body.MovieId,
                        title: req.body.Title,
                        poster_path: req.body.PosterPath,
                        genres: req.body.Genres,
                        created_at: new Date()
                    };

                    movieArray.push(newFavoriteMovie);

                    Favorites.update(
                        { movieFavorites: movieArray },
                        { where: { username: req.session.username } }
                    )

                    res.json(movieArray)
                }

            }

        } catch (err) {
            console.log(`sflhsafljsafljsafhaslsahsaljfasd ${err}`)
            res.status(500).json(err)
        }
    },

    addShowToFavorite: async (req, res) => {
        try {
            const favoritesArray = await Favorites.findOne({ where: { username: req.session.username } });

            if (favoritesArray?.dataValues.movieFavorites !== null && favoritesArray?.dataValues.showFavorites === null) {
                const newShowFavorite = await Favorites.update(
                    {
                        showFavorites: [
                            {
                                id: req.body.ShowId,
                                title: req.body.Title,
                                poster_path: req.body.PosterPath,
                                genres: req.body.Genres,
                                created_at: new Date()
                            }
                        ]
                    },
                    { where: { username: req.session.username } }
                );
                return res.json(newShowFavorite)
            } else if (favoritesArray === null || favoritesArray?.dataValues?.showFavorites === null) {
                const newShowFavorite = await Favorites.create({
                    username: req.session.username,
                    showFavorites: [
                        {
                            id: req.body.ShowId,
                            title: req.body.Title,
                            poster_path: req.body.PosterPath,
                            genres: req.body.Genres,
                            created_at: new Date()
                        }
                    ]
                });
                return res.json(newShowFavorite);
            } else {
                let showArray = favoritesArray?.dataValues.showFavorites;
                if (showArray?.some(e => e.id === req.body.ShowId)) {
                    return res.status(400).json({ message: 'That movie is already in your favorites!' });
                } else {
                    const newFavoriteShow = {
                        id: req.body.ShowId,
                        title: req.body.Title,
                        poster_path: req.body.PosterPath,
                        genres: req.body.Genres,
                        created_at: new Date()
                    };

                    showArray.push(newFavoriteShow);

                    Favorites.update(
                        { showFavorites: showArray },
                        { where: { username: req.session.username } }
                    )

                    res.status(200).json({ message: `Successfully deleted ${req.body.title} from your favorites.` })
                }

            }

        } catch (err) {
            console.log(`sflhsafljsafljsafhaslsahsaljfasd ${err}`)
            res.status(500).json(err)
        }
    },

    deleteMovieFromFavorites: async (req, res) => {
        try {
            const favoritesArray = await Favorites.findOne({ where: { username: req.session.username } });

            const movieArray = favoritesArray?.dataValues.movieFavorites;
            const index = movieArray.findIndex(x => +x.id === +req.params.MovieId);
            if (index <= -1) return res.sendStatus(409)
            movieArray.splice(index, 1);

            Favorites.update(
                { movieFavorites: movieArray },
                { where: { username: req.session.username } }
            );

            res.json(favoritesArray);

        } catch (err) {
            res.status(500).json(err)
        }
    },

    deleteShowFromFavorites: async (req, res) => {
        try {
            const favoritesArray = await Favorites.findOne({ where: { username: req.session.username } });

            const showArray = favoritesArray?.dataValues.showFavorites;
            showArray.findIndex(x => console.log(`id of showArray = ${x.id}`));
            const index = showArray.findIndex(x => +x.id === +req.params.ShowId);

            if (index !== -1) showArray.splice(index, 1);

            Favorites.update(
                { showFavorites: showArray },
                { where: { username: req.session.username } }
            );

            res.json(favoritesArray);

        } catch (err) {
            res.status(500).json(err)
        }
    }
}
