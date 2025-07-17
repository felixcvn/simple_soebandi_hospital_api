const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Dokter = require('./dokter');
const Pasien = require('./pasien');

const Booking = sequelize.define('Booking', {
    date: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'Pending' }
});

Dokter.hasMany(Booking);
Booking.belongsTo(Dokter);

Pasien.hasMany(Booking);
Booking.belongsTo(Pasien);

module.exports = Booking;
