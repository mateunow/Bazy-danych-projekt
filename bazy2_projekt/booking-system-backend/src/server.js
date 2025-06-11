// src/server.js
// ---------------

// 1) Log start
console.log('✔️ src/server.js załadowany');

// 2) Wczytanie zmiennych środowiskowych
require('dotenv').config();

// 3) Importy
const express   = require('express');
const connectDB = require('./config/db');

// 4) Inicjalizacja aplikacji
const app = express();

// 5) Połączenie z MongoDB
connectDB();

// 6) Middleware do parsowania JSON
app.use(express.json());

// 7) Podłączenie routerów CRUD
app.use('/api/users',        require('./routes/users'));
app.use('/api/resources',    require('./routes/resource'));
app.use('/api/reservations', require('./routes/reservation'));
app.use('/api/logs',         require('./routes/logs'));
app.use('/api/reports', require('./routes/reports'));


// 8) Testowy root endpoint
app.get('/', (req, res) => {
  res.send('API działa! 🎉');
});

// 9) Start serwera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
