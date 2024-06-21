const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/news', async (req, res) => {
    const { category } = req.query;
    const apiKey = process.env.VITE_NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&pageSize=100&apiKey=${apiKey}`;

    try {
        console.log(`Fetching news for category: ${category}`);
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
