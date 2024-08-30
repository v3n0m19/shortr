const express = require('express');
const router = express.Router();
const { shortenUrl, redirectToOriginalUrl } = require('../controllers/urlController');

// Route to shorten a URL
router.post('/api/shorten', shortenUrl);

// Route to redirect to the original URL
router.get('/api/:shortUrl', redirectToOriginalUrl);

module.exports = router;
