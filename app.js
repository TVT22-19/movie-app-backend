const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");


const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const loginRouter = require("./routes/login");
const deleteRouter = require('./routes/delete');



const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/login", loginRouter);
app.use('/delete', deleteRouter);

app.listen(8080, function(){
    console.log("Server running, maybe...");
});

module.exports = app;
