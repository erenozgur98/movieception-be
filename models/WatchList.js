const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class WatchList extends Model { }

WatchList.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        movieWatchList: {
            type: DataTypes.JSON
        },
        showWatchList: {
            type: DataTypes.JSON
        },
        createdAt: {
            type: DataTypes.DATE,
            default: Date.now
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'watchlist'
    }
)

module.exports = WatchList;