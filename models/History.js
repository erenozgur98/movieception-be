const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class History extends Model { }

History.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        movieHistory: {
            type: DataTypes.JSON
        },
        showHistory: {
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
        modelName: 'history'
    }
)

module.exports = History;