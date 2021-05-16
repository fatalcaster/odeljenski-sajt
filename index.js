if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const { urlencoded } = require("express");

// Express use
app.use(expressLayouts);
app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Express set
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.get("/css/toast.min.css", (req, res) => {
    res.sendFile(__dirname + '/views/css/toast.min.css');
});

app.get("/js/toast.min.js", (req, res) => {
    res.sendFile(__dirname + '/views/js/toast.min.js');
});

// Routes
app.use("/", indexRouter);
app.use("/user", userRouter);

// Server
app.listen(process.env.PORT || 3000);