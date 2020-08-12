const express = require('express');
const data = require('./data.json');
const { projects } = data;

const app = express()

// Set pug as view engine
app.set('view engine', 'pug');

// Set static route
app.use('/static', express.static('public'));

// Set index route
app.get('/', (req, res) => {
    res.render('index', { projects });
});

// About route
app.get('/about', (req, res) => {
    res.render('about');
});

// Project route with ID param
app.get('/project/:id', (req, res) => {
    const { id } = req.params;
    const project = projects[id];
    res.render('project', { project });
});

// Creates 404 error
app.use((req, res, next) => {
    const err = new Error('Whoops! Something went wrong!');
    err.status = 404;
    console.log('This URL does not exist');
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    res.locals.err = err;
    res.status(err.status);
    res.render('error');
});

// Sets the port to listen on
app.listen(3000, () => {
    console.log('The application is running on localhost:3000')
});