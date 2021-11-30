const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

mongoose
	.connect("mongodb://localhost/medium-clone")
	.then(() => console.log("MongoDB up"))
	.catch((e) => console.log(e));

const session = require("express-session");
const passport = require("passport");

require("./auth/auth.config")(passport);

const { controller: userController } = require("./user");
const { controller: authController } = require("./auth");

app.use(express.json());

app.use(
	session({
		secret: process.env.SECRET,
		resave: true,
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(authController);
app.use(userController);

const port = 4000 || process.env.PORT;

app.listen(port, () => {
	return console.log(`server is listening on ${port}`);
});
