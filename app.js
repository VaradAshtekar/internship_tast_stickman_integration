var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
testAPIRouter = require("./routes/testAPI");
var cors = require("cors");
var bodyParser = require('body-parser');

const channelModel = require("./models/channel")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const fs = require('fs');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json())

const PDFDocument = require('pdfkit');

const doc = new PDFDocument();
const pdf = require('html-pdf');
//uQD2uIc4sngfu7CG Mongo password
const mongoose = require("mongoose");
const dburl = "mongodb+srv://VaradNode:uQD2uIc4sngfu7CG@cluster0.ftb51ch.mongodb.net/Stickman?retryWrites=true&w=majority"

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(dburl, connectionParams).then(() => {
  console.info("Connected to DB");
}).catch((e) => {
  console.log("Error", e);
})
var sno = 0;
var token_no = 10001;
app.use(cors());

app.post('/pdf-create', (req, res) => {
  const name = req.body.name;
  const number = req.body.numbers;

  for (var i = 0; i < number.length; i++) {

    var ChannelModel = new channelModel();
    console.log(number[i]);
    sno++;
    token_no++;
    ChannelModel.sno = sno;
    ChannelModel.token_number = token_no;
    ChannelModel.number = number[i];
    ChannelModel.name = name;

    ChannelModel.save((err, data) => {
      if (err) {
        console.log(err);
      }
    })


  }


})


app.use(cors());
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
