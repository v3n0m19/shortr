const redisClient = require('../config/redisClient');

class Url {
    static async shorten(originalUrl, shortUrl, ttl) {
        await redisClient.set(shortUrl, originalUrl, {
            EX: ttl * 24 * 60 * 60 // Set the TTL in seconds (days * 24 * 60 * 60)
        });
    }

    static async getOriginalUrl(shortUrl) {
        return await redisClient.get(shortUrl);
    }


}

module.exports = Url;
