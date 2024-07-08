const express = require("express");
const session = require('express-session');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./routes');
const cors = require('cors')

const PORT = process.env.PORT || 3001;
const app = express();

const sess = {
    secret: 'Super secret secret',
    cookie: { secure: true },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(cors())
app.use(session(sess));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, function () {
        console.log(`🌎 ==> API server now on port ${PORT}!`);
    });
});
