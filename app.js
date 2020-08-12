const express = require('express');
const data = require('./data.json');
const { projects } = data;

const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    const { id } = req.params;
    const project = projects[id];
    res.render('project', { project });
});

app.use((req, res, next) => {
    const err = new Error('Whoops! Something went wrong!');
    err.status = 404;
    console.log('This URL does not exist');
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.err = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000')
});