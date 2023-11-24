const express = require('express');
const app = express();
const port = 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Route for home page
app.get('/', (req, res) => {
  res.render('home'); 
});

// Route for the team list page
app.get('/teams_list', (req, res) => {
  res.render('teams_list'); 
});

// Route for the tournament bracket page 
app.get('/tournament_bracket', (req, res) => {
  res.render('tournament_bracket'); 
});

// Route for the login page 
app.get('/login', (req, res) => {
  res.render('login')
});

// Wildcard route for any undefined paths
app.get('*', (req, res) => {
  res.redirect('/');
});

// Starts the server 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});