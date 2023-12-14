const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors');


const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const registrationRouter = require("./routes/registration");
const deleteRouter = require('./routes/delete');
const newsRouter = require("./routes/news");
const scheduleRouter = require("./routes/schedule");
const groupsRouter = require("./routes/groups");
const requestsRouter = require("./routes/grouprequests");
const reviewRouter = require("./routes/reviews");
const groupPostRouter = require("./routes/group_posts");
const searchRouter = require("./routes/search");
const moviedbRouter = require("./routes/moviedb");

const app = express();
app.use(cors());

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
app.use("/registration", registrationRouter);
app.use('/delete', deleteRouter);
app.use("/news", newsRouter);
app.use("/schedule", scheduleRouter);
app.use("/group", groupsRouter);
app.use("/grouprequest", requestsRouter);
app.use("/review", reviewRouter);
app.use("/group-post", groupPostRouter);
app.use("/search", searchRouter);
app.use("/moviedb", moviedbRouter);

// TODO: move port to .env
app.listen(3001, function(){
    console.log("Backend server is running on port 3001");
});

module.exports = app;
