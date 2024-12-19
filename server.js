const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    res.send({ quote: randomQuote });
});

app.get('/api/quotes', (req, res) => {
    const { person } = req.query;

    if (person) {
        const filteredQuotes = quotes.filter(quote => quote.person === person);
        res.send({ quotes: filteredQuotes});
    } else {
        res.send({ quotes })
    }

});

app.post('/api/quotes', (req, res) => {
    const { quote, person } = req.query;
    const newQuote = { quote, person };

    if (quote && person) {
        quotes.push(newQuote);
        res.send({quote: newQuote});
    } else {
        res.status(400).send();
    }
});

