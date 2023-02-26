
import express from "express";

import bodyParser from "body-parser";

import mongoose from "mongoose";

// import bookRoutes from './src/router/book.router';

import authRoutes from "./src/router/authRouter";
import session from "express-session";
import passport from "./src/middleware/passport";

const PORT = 3000;

const app = express();

app.set("view engine", "ejs");

app.set('views', './src/views');

const DB_URL = 'mongodb://127.0.0.1:27017/test1';

mongoose.connect(DB_URL)

    .then(() => console.log('DB Connected!'))

    .catch(error => console.log('DB connection error:', error.message));

app.use(bodyParser.json());

// app.use('/book', bookRoutes);
app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 60 * 1000}
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);
app.use(express.urlencoded({ extended: false }));


app.listen(PORT, () => {

    console.log("Server is running on http://localhost:3000/auth/login");

})
//npm run start:dev