const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const client = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_URL,
        port: process.env.REDIS_PORT
    }
});
client.on('error', (err) => console.error('Redis client error', err));


module.exports = client;
