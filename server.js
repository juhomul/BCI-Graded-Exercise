const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = 3000

app.use(bodyParser.json());

// Users model
let users = [
    {
        id: uuidv4(),
        username: "Juho",
        password: "password",
        email: "test@example.com"
    }
];

// Postings model
let postings = [
    {
        id: uuidv4(),
        title: 'Selling a car',
        description: 'Toyota Corolla 06',
        category: 'Cars',
        city: 'Oulu',
        price: 300.0,
        postDate: '2020-13-10',
        deliveryType: 'Pickup',
        sellerName: 'Juho',
        sellerEmail: 'test@example.com'
    }
];

// Home page
app.get('/', (req, res) => {
    res.send('Hello!')
})


//------------------------------------
//-----     GET CALLS       ----------   
//------------------------------------


app.get('/postings', (req, res) => {
    res.json({                                                                              //---- GET ALL POSTINGS
        postings
    });
})

app.get('/postings/:id', (req, res) => {
    const result = postings.find(t => t.id == req.params.id);                               //---- GET POSTING BASED ON ID
    if(result !== undefined) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
})

app.get('/postings/category/:category', (req, res) => {
    const result = postings.find(t => t.category === req.params.category);                  //---- GET POSTING BASED ON CATEGORY
    if(result !== undefined) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
})

app.get('/postings/city/:city', (req, res) => {
    const result = postings.find(t => t.city == req.params.city)                            //---- GET POSTING BASED ON CITY
    if(result !== undefined) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
})

app.get('/postings/postDate/:postDate', (req, res) => {
    const result = postings.find(t => t.postDate == req.params.postDate)                    //---- GET POSTING BASED ON POSTDATE
    if(result !== undefined) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
})


//------------------------------------
//-----      POST CALLS       --------
//------------------------------------

app.post('/postings', (req, res) => {                                                       //---- POST NEW POSTING

    postings.push({
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        city: req.body.city,
        price: req.body.price,
        postDate: req.body.postDate,
        deliveryType: req.body.deliveryType,
        sellerName: req.body.sellerName,
        sellerEmail: req.body.sellerEmail
    })
    res.sendStatus(201);
})


//------------------------------------
//-----       PUT CALLS       --------
//------------------------------------

app.put('/postings/:id', (req, res) => {                                                       //---- MODIFY POSTING BY ID
    const result = postings.find(t => t.id == req.params.id);
    if(result !== undefined) {
        for (const key in req.body) {
            result[key] = req.body[key];
        }
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});


//------------------------------------
//-----      DELETE CALLS       ------
//------------------------------------

app.delete('/postings/:id', (req, res) => {
    const result = postings.findIndex(t => t.id == req.params.id);                              //---- DELETE POSTING BY ID
    if(result !== -1) {
        postings.splice(result, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
})

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let apiInstance = null;
exports.start = () => {
    apiInstance = app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}

exports.stop = () => {
    apiInstance.close();
}