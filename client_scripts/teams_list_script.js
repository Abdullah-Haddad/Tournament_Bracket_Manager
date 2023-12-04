randomizer_on = true;

function collect_submitted_teams() {

    var team_names = [];

    for (let i = 1; i <= 16; i++) {
        const inputName = `team${i}`;
        const inputValue = document.getElementById(inputName).value;
        team_names.push(inputValue);

    if(randomizer_on) {
        team_names = shuffle_array(team_names); 
    }

    alert(team_names);

    send_to_server(team_names);
    }
}

function send_to_server(team_names) {

    fetch('/submit-teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamNames: team_names }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Server response:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
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

    return array; 
}
}