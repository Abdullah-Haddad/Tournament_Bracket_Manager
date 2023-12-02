const { MongoClient } = require('mongodb');

let randomizer_on = false;

async function send_submitted_teams() {
    const mongoConnectionString = 'mongodb+srv://new-user_31:U9pYloBugi8cvaCN@mongodbserver.bwuzblx.mongodb.net/';
    const client = new MongoClient(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    var team_names = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p']; //filler team names
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
  
    try {
      await client.connect();
      const db = client.db('teams'); 
      const collection = db.collection('teams_collection');

      const documents = await collection.find().toArray();

      console.log('Documents:', documents);

      if (randomizer_on) {
        shuffle_array(team_names);
      }
      
      for (let i = 0; i < 16; i++) {

        var query = { position: team_positions[i]}; 
        var update_operation = { $set: { name: team_names[i] } };

        await collection.updateOne(query, update_operation);
        result = await collection.find(query).toArray();
        team = result[0].name;

        console.log(team);

      }
      
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }

    client.db.teams_collection.findOne()
  }
  
function toggle_randomizer() {
    randomizer_on = !randomizer_on 
}

function shuffle_array(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  } // Fisher-Yates shuffle algorithm 

send_submitted_teams().catch(console.error);



