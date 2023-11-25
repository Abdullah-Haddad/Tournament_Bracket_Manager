document.querySelector('form').addEventListener('store', submit_teams);

function store_teams(event) {

    event.preventDefault(); // Prevent the forum from submitting

    const teamData = {};

    for (let i = 1; i<=8; i++) {
        const inputName = `team${i}`;
        teamData[inputName] = document.getElementById(inputName).value;
    }

    

}



