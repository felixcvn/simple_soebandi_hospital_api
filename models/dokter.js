const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Dokter = sequelize.define('Dokter', {
    name: { type: DataTypes.STRING, allowNull: false },
    specialization: { type: DataTypes.STRING, allowNull: false },
    schedule: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Dokter;
