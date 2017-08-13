const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const assert = require('assert');
const logger = require('morgan');
const path = require('path');
const port = 3001;
const mongoUri =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/anadea';
const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// make sure we can connect to database before starting server
MongoClient.connect(mongoUri, function(err, db) {
  assert.equal(null, err);
  console.log('Successfully connected to mondodb');

  app.get('/api/tasks', function(req, res) {
    db.collection('tasks').find({}).toArray(function(err, task) {
      res.send({ tasks: task });
      console.log(task);
    });
  });
  app.post('/api/tasks/add', function(req, res) {
    console.log('get post');
    console.log(req.body);
    let task = req.body;
    db.collection('tasks').insertOne(task, function(err, doc) {
      assert.equal(null, err);
      console.log(doc);
      res.status(200).end();
    });
  });
  app.delete('/api/tasks/remove', function(req, res) {
    console.log('get delete');
    console.log(req.body);
    let task = req.body;
    db
      .collection('tasks')
      .findOneAndDelete({ countId: task.countId }, function(err, doc) {
        assert.equal(null, err);
        console.log(doc);
        res.status(200).end();
      });
  });
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      console.log(err);
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }
  app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.status(500).json({ error: err.message });
  });
  app.listen(port, function() {
    console.log('Server listening on port ' + port);
  });
});
