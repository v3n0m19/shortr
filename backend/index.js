const express = require('express');
const dotenv = require('dotenv');
const urlRoutes = require('./routes/urlRoutes');
const errorHandler = require('./middleware/errorHandler');
const redisClient = require('./config/redisClient');

dotenv.config({ path: '../.env' });

const app = express();
app.use(express.json());

redisClient.connect().then(() => {
    console.log('Connected to Redis');
}).catch(err => {
    console.error('Failed to connect to Redis', err);
    process.exit(1); 
});

app.use(urlRoutes);

app.use(errorHandler);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;
