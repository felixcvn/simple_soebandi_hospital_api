const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/db').default;

const dokterRoutes = require('./routes/dokter');
const pasienRoutes = require('./routes/pasien');
const bookingRoutes = require('./routes/booking');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'API is running' }));

app.use('/api/dokter', dokterRoutes);
app.use('/api/pasien', pasienRoutes);
app.use('/api/booking', bookingRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
});
