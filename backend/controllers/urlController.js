const Url = require('../models/Url');

exports.shortenUrl = async (req, res) => {
    const { originalUrl, shortUrl = null, days } = req.body;

    let toShort=shortUrl;
    console.log(originalUrl, toShort , days);

    if (!originalUrl || !days) {
        return res.status(400).json({ error: 'Invalid input' });
    }
    if(!shortUrl){
     toShort = Math.random().toString(36).substring(2, 8);
    }
    
    const existingUrl = await Url.getOriginalUrl(toShort);

    if(existingUrl){
        return res.status(400).json({ error: 'Short URL already exists' })
    }

    try {
        await Url.shorten(originalUrl, toShort, days);
        res.status(201).json({ toShort });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.redirectToOriginalUrl = async (req, res) => {
    const { shortUrl } = req.params;
    
    try {
        const originalUrl = await Url.getOriginalUrl(shortUrl);
        if (originalUrl) {
            res.redirect(originalUrl);
            console.log(originalUrl)
        } else {
            res.status(404).json({ error: 'URL not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
