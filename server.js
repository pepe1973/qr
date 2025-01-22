const express = require('express');
const ejs = require('ejs');
const path = require('node:path');
const fsPromise = require('node:fs/promises');

const app = express();
const PORT = 5000;
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    try {
        return res.status(200).render('index.ejs');
    } catch (error) {
        return res.status(500).json({ msg: 'Hiba: ' + error.message });
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
