const express = require('express');
const Booking = require('../models/booking');
const auth = require('../middleware/auth');
const router = express.Router();

// Buat booking
router.post('/', auth, async (req, res) => {
    const { dokterId, date } = req.body;
    const booking = await Booking.create({ date, DokterId: dokterId, PasienId: req.user.id });
    res.json(booking);
});

// Lihat semua booking user
router.get('/', auth, async (req, res) => {
    const bookings = await Booking.findAll({ where: { PasienId: req.user.id } });
    res.json(bookings);
});

// Update status booking
router.put('/:id', auth, async (req, res) => {
    const { status } = req.body;
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    booking.status = status;
    await booking.save();
    res.json(booking);
});

// Cancel booking
router.delete('/:id', auth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    await booking.destroy();
    res.json({ message: 'Booking deleted' });
});

module.exports = router;
