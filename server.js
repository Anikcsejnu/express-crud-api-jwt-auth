const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')

const PORT = process.env.PORT || 3500;

// Custom middleware-logger
app.use(logger);

// Cross origin resource sharing - third party middleware
app.use(cors(corsOptions));

// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// Built-in middleware to handle json data
app.use(express.json());

// server static file
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/api/register'));
app.use('/employees', require('./routes/api/employees'));

app.all('/*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: "404 not found"});
    } else {
        res.type('txt').send("404 not found");
    }
});

// custom middleware to handle and log error
app.use(errorHandler);

app.listen(PORT, () => 
console.log(`Server is running on port ${PORT}`));