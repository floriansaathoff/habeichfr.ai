//create a Server
const express = require("express");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: false }));

//DB Connection
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.pluralize(null);
const bundeslandSchema = new mongoose.Schema({ Feiertag: String });

//setting viewengine from the pages to ejs
app.set("view engine", "ejs");

//render the page
app.get("/", (req, res) => {
    res.render("index");
});

//use json
app.use(express.json());
//use jquery
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'))
//use static files
app.use(express.static(__dirname + '/public'));

try {
    mongoose.connect(process.env.MONGOSTR, { useNewUrlParser: true });
    console.info(`Listening on page`);
} catch (e) {
    console.log("There was an error starting the app");
    console.log(e.message);
}

app.post("/checkdate", async (req, res) => {
    try {
        const Bundesland = req.body.Bundesland;
        const dev = req.body.dev;
        if(Bundesland) {
            const url = process.env.MONGOSTR;

            await mongoose.connect(url, { useNewUrlParser: true });

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            let thisday = yyyy + mm + dd;
            //thisday = "20221003"; //Uncomment to test for a Feiertag

            if(dev) {thisday = parseInt(dev)}

            const bundesland = mongoose.model(Bundesland, bundeslandSchema);

            // Find the Day in Bundesland
            const theday = await bundesland.findOne({ Feiertag: thisday });

            res.status(200).json(theday);
        } else {
            console.log("catching data error in backend - checkdate");
            res.status(500).json(e.message);
        }
    } catch(e) {
        console.log("catching error in backend - checkdate");
        res.status(500).json(e.message);
    }
});

app.listen(process.env.PORT || port, () => console.log("listening on port"));