const express = require("express");
const app = express();
const path = require("path");
const port = 8000;
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Mongoose Schema

// EXPRESS SPECIFIC CONFIGURATIONS
app.use('/static', express.static('static'));  // For serving static files
app.use(express.urlencoded({extended: true}));

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);


// PUG SPECIFIC CONFIGURATIONS
app.set('view engine', 'pug');  // Set the tempelate engine as pug
app.set('views', path.join(__dirname, 'views'));  // Set the views directory 

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved in the Database")
    }).catch(()=>{
        res.status(400).send("Item was not saved in the database")
    });
});

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});

