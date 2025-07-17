const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Pasien = require('../models/pasien');
const auth = require('../middleware/auth');
require('dotenv').config();

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const pasien = await Pasien.create({ name, email, password: hashedPassword });
    res.json(pasien);
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const pasien = await Pasien.findOne({ where: { email } });
    if (!pasien) return res.status(404).json({ error: 'Email not found' });

    const match = await bcrypt.compare(password, pasien.password);
    if (!match) return res.status(401).json({ error: 'Wrong password' });

    const token = jwt.sign({ id: pasien.id, email: pasien.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
});

// Profile
router.get('/profile', auth, async (req, res) => {
    const pasien = await Pasien.findByPk(req.user.id);
    res.json(pasien);
});

module.exports = router;
