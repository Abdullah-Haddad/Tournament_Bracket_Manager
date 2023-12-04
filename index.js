const express = require('express');
const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");
const app = express();
const port = 3000;

randomizer_on = true; 
var team_names = [];
var team_positions = [ 
    [1, 1, 0], 
    [1, 2, 0], 
    [1, 3, 0], 
    [1, 4, 0], 
    [1, 5, 0], 
    [1, 6, 0], 
    [1, 7, 0], 
    [1, 8, 0], 
    [1, 1, 1],
    [1, 2, 1], 
    [1, 3, 1], 
    [1, 4, 1],
    [1, 5, 1], 
    [1, 6, 1], 
    [1, 7, 1], 
    [1, 8, 1],  
];

//const mongoConnectionString = 'mongodb+srv://new-user_31:U9pYloBugi8cvaCN@mongodbserver.bwuzblx.mongodb.net/';

//mongoose.Promise = global.Promise;
//mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

async function send_submitted_teams() {

  alert("Running submission function.");

  const mongoConnectionString = 'mongodb+srv://new-user_31:U9pYloBugi8cvaCN@mongodbserver.bwuzblx.mongodb.net/';
  const client = new MongoClient(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

  alert("Declared connection constants.");

  try {
    await client.connect();
    const db = client.db('teams'); 
    const collection = db.collection('teams_collection');

    alert("Connected to MongoDB.")

    collect_submitted_teams();

    if (randomizer_on) {
      shuffle_array(team_names);
    }
    
    for (let i = 0; i < 16; i++) {

      var query = { position: team_positions[i]}; 
      var update_operation = { $set: { name: team_names[i] } };

      await collection.updateOne(query, update_operation);
      result = await collection.find(query).toArray();
      team = result[0].name;

      alert("Teams submitted sucessfully.");

    }
  } catch (e) {
    alert("Something went wrong.");
    console.error(e);
  } finally {
    await client.close();
  }
}

function toggle_randomizer() {
  randomizer_on = !randomizer_on 

  toggle_button = document.getElementById('toggle_button');
  
  if (randomizer_on) {
      toggle_button.innerHTML = "Random"; 
  } else {
      toggle_button.innerHTML = "Not Random";
  }
}

function shuffle_array(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
} // Fisher-Yates shuffle algorithm 


function collect_submitted_teams() {

  for (let i = 1; i <= 16; i++) {
      const inputName = `team${i}`;
      const inputValue = document.getElementById(inputName).value;
      team_names.push(inputValue);
  }
}

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

