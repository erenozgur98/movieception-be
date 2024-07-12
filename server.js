const cors = require('cors')
const express = require("express");
const session = require('express-session');
const dotenv = require("dotenv");
const helmet = require("helmet");
const nocache = require("nocache");
dotenv.config();

const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const MySQLStore = require('express-mysql-session')(session);
const routes = require('./routes');

const { errorHandler } = require('./middleware/error.middleware')

const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;
const PORT = process.env.PORT || 3001;
const app = express();

// const sess = {
//     secret: process.env.SEQUELIZE_SESSION_SECRET,
//     cookie: {
//         secure: true,
//         maxAge: 7 * 24 * 3600 * 1000,
//         expires: 7 * 24 * 3600 * 1000
//         // maxAge: 7 * 24 * 3600 * 1000 - a week
//     },
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//         db: sequelize
//     })
// };

const options = {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    expiration: 1000 * 60 * 60 * 24,
    clearExpired: true,
    checkExpirationInterval: 1000 * 60 * 60 * 24
};

const sessionStore = new MySQLStore(options);

app.use(express.json());
app.set("json spaces", 2);

app.use(
    helmet({
        hsts: {
            maxAge: 31536000,
        },
        contentSecurityPolicy: {
            useDefaults: false,
            directives: {
                "default-src": ["'none'"],
                "frame-ancestors": ["'none'"],
            },
        },
        frameguard: {
            action: "deny",
        },
    })
);

app.use((req, res, next) => {
    res.contentType("application/json; charset=utf-8");
    next();
});
app.use(nocache());

app.use(
    cors({
        origin: CLIENT_ORIGIN_URL,
        methods: ["GET"],
        allowedHeaders: ["Authorization", "Content-Type"],
        maxAge: 86400,
    })
);

app.use(cors());
// app.use(session(sess));
app.use(session({
    key: 'session_cookie_name',
    secret: process.env.SEQUELIZE_SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.use(errorHandler);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, function () {
        console.log(`🌎 ==> API server now on port ${PORT}!`);
    });
});
