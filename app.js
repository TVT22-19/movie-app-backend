const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const newsRouter = require("./routes/news");
const scheduleRouter = require("./routes/schedule");
const reviewRouter = require("./routes/reviews");
const groupPostRoter = require("./routes/group_posts");

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
app.use("/news", newsRouter);
app.use("/schedule", scheduleRouter);
app.use("/review", reviewRouter);
app.use("/group-post", groupPostRoter);

// TODO: move port to .env
app.listen(3001, function(){
    console.log("Server running, maybe...");
});

module.exports = app;
