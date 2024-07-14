const express = require('express')
const app = express()

// 1. Be Polite, Greet the User
app.get('/greetings/:username', (req, res) => {
    const username = req.params.username
    res.send(`<h1>Hello there, ${username}!</h1>`);
});

// 2. Rolling the Dice
app.get('/roll/:num', (req, res) => {
    const num = req.params.num
    if (!isNaN(num)) {
        const random = Math.floor((Math.random() * num) + 1);
        res.send(`<h1>You rolled a ${random}.</h1>`);
    }
    else
        res.send(`<h1>You must specify a number.</h1>`);
});

// 3. I Want THAT One!
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
    const index = req.params.index;

    if (index < collectibles.length) {
        const name = collectibles[index].name;
        const price = collectibles[index].price;
        res.send(`So, you want the ${name}? For ${price}, it can be yours!`);
    } else
        res.send(`<h1>This item is not yet in stock. Check back soon!</h1>`);
});

// 4. Filter Shoes by Query Parameters
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    const minPrice = req.query.minPrice
    const maxPrice = req.query.maxPrice
    const type = req.query.type
    let FilterShoes = shoes

    if (minPrice)
        FilterShoes = shoes.filter(x => x.price > minPrice)

    if (maxPrice)
        FilterShoes = shoes.filter(x => x.price < maxPrice)

    if (type)
        FilterShoes = shoes.filter(x => x.type === type)

    let print = '';
    FilterShoes.forEach(x =>
        print += (`<h3>${x.name} - ${x.price}$ - ${x.type}<br></h3>`)
    )
    res.send(print)
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})