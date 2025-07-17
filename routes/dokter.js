const express = require('express');
const Dokter = require('../models/dokter');
const router = express.Router();

// GET semua dokter
router.get('/', async (req, res) => {
    const dokters = await Dokter.findAll();
    res.json(dokters);
});

// GET detail dokter
router.get('/:id', async (req, res) => {
    const dokter = await Dokter.findByPk(req.params.id);
    if (!dokter) return res.status(404).json({ error: 'Dokter not found' });
    res.json(dokter);
});

// Search dokter by specialization
router.get('/search/query', async (req, res) => {
    const { specialization } = req.query;
    const dokters = await Dokter.findAll({ where: { specialization } });
    res.json(dokters);
});

// Tambah dokter
router.post('/', async (req, res) => {
    const { name, specialization, schedule } = req.body;
    const dokter = await Dokter.create({ name, specialization, schedule });
    res.json(dokter);
});

module.exports = router;
