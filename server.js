const express = require('express');
const morgan = require('morgan');
const logger = require('morgan');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3005;
const app = express();

app.use(morgan("dev"));

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        //useCreateIndex: true,
    }
)

//moved api and html/home routes to separate folder
app.use(require("./routes/apiroutes.js"));
app.use(require("./routes/htmlroutes.js"));

app.listen(PORT, () => {
    console.log(`App calls on port ${PORT}`);
});
