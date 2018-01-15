var express = require('express');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('gt_ft_nov_8', 'root', '', {
  dialect: 'mysql',
  operatorsAliases: false
});

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// const Note = sequelize.define('note', {
//   title: {
//     type: Sequelize.STRING
//   },
//   details: {
//     type: Sequelize.TEXT
//   }
// }, {
// 	tableName: 'people'
// });

const Note = sequelize.define('note', {
  title: {
    type: Sequelize.STRING
  },
  details: {
    type: Sequelize.TEXT
  }
});

// Note.create({
// 	title: 'some title',
// 	details:'some details about the note'
// });

Note.sync().then(function() {
	console.log('Synced');
});


// console.log(path.join(__dirname, 'public'));
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public'))); // share the files/folders in public with the front

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	Note.findAll().then(function(notes) {
		// for ( var i = 0; i < notes.length; i++ ) {
		// 	console.log(notes[i].title);
		// }
		res.render('index', {data: notes});
	});
});

app.post('/notes', function(req, res) {
	Note.create({
		title: req.body.title,
		details: req.body.details
	}).then(function() {
		res.redirect('/');
	});
});

app.listen(5000, function() {
	console.log('Listening on 5000....');
});











// var port = 3000;
// var port = process.env.PORT || 5000;

// var test = '' || true || 'yep';

// console.log(test); // true

