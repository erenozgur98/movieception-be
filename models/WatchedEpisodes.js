const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class WatchedEpisodes extends Model { }

WatchedEpisodes.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        watchedEpisodes: {
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
        modelName: 'watchedepisodes'
    }
)

module.exports = WatchedEpisodes;