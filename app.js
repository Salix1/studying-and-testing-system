const path = require('path');
const fs = require('fs');

const express = require('express');

const app = express();

app.set('view engine', 'ejs');

const rootDir = require('./util/rootDir');

const correctAnswers = ['2','2','3','1','2','1','3','1','2','3','3','3','2','1','1','2','2','3','2','1'];
let userNumber = 0;

app.use(express.static(path.join(rootDir, 'public'))); 

app.use(express.urlencoded({extended: true}));

fs.writeFile('results.txt', '', err => {
    if (err) {
      console.error(err);
      return;
    }
});

app.post('/results', (req, res) => {
    if (Object.values(req.body).length != 0) {
        let answArr = Object.values(req.body).slice(2);
        let points = 0;
        userNumber++;
        for (let i = 0; i < 20; i++) {
            if (answArr[i] == correctAnswers[i]) {
                points++;
            }
        }
        res.render('results', {points: points});
        fs.appendFile('results.txt', userNumber +') '+ req.body.name + ', группа ' + 
            req.body.group + ', баллы: ' + points + ', ответы: ' + answArr + '\r\n', err => {
            if (err) {
            console.error(err);
            return;
            }
        });
        res.end();
    } else {
        res.redirect('/');
        res.end();
    }
});

app.get('/results', (req, res) => {
    res.redirect('/');
    res.end();
});

app.use('/final-test', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'final-test.html'));
});

app.use('/measurements-test', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'measurements-test.html'));
});

app.use('/measurements', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'measurements.html'));
});

app.use('/text-info-test', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'text-info-test.html'));
});

app.use('/text-info', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'text-info.html'));
});

app.use('/graphic-info-test', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'graphic-info-test.html'));
});

app.use('/graphic-info', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'graphic-info.html'));
});

app.use('/audio-info-test', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'audio-info-test.html'));
});

app.use('/audio-info', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'audio-info.html'));
});

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

console.log("app running on port 3000");
app.listen(3000);