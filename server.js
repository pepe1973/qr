const express = require('express');
const ejs = require('ejs');
const path = require('node:path');
const fsPromise = require('node:fs/promises');

const app = express();
const PORT = 5000;
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    try {
        return res.status(200).render('index.ejs');
    } catch (error) {
        return res.status(500).json({ msg: 'Hiba: ' + error.message });
    }
});

app.post('/filebakiir', async (req, res) => {
    const { nev } = req.body;
    const nap = new Date().getDate();
    const honap = new Date().getMonth();
    const ev = new Date().getFullYear();
    const ora = new Date().getHours();
    const perc = new Date().getMinutes();
    const masodperc = new Date().getSeconds();
    const idopont = `${ev}_${honap + 1}_${nap}.csv`;

    try {
        const filenev = path.resolve(__dirname, 'public', 'napok', idopont);
        const tartalom = `${nev.split(';')[0]};${
            nev.split(';')[1]
        };${ora}:${perc}:${masodperc}`;

        const noveltTartalom = tartalom + '\n';

        await fsPromise.appendFile(filenev, '\ufeff' + noveltTartalom, {
            encoding: 'utf-8',
        });
        return res.status(201).json({ msg: 'Sikeres file-ba írás!' });
    } catch (error) {
        return res.status(500).json({ msg: 'Hiba: ' + error.message });
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
