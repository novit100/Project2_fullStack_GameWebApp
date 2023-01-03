const userName = document.getElementById('user-name')
const Uname = document.cookie.split('=')[1] || JSON.parse(localStorage.getItem('currentUser'));
userName.innerText += " " + Uname;

// <-- code for score variables get out from local storage from to: -->
let formData = JSON.parse(localStorage.getItem('formData')) || [];
const name_arr = formData.map(data => data.username);
const score_arr = formData.map(data => data.scoreScaling);

createTable();

// <-- code for score table -->
function createTable() {

    for (let i = 0; i < name_arr.length; i++) {
        // add new tr tag for name and score to the table
        const tr = document.createElement('tr');
        const td_name = document.createElement('td');
        const td_score = document.createElement('td');
        td_name.classList.add('player-name');
        td_name.classList.add('table__row');
        td_score.classList.add('score');
        td_score.classList.add('table__row');
        tr.appendChild(td_name);
        tr.appendChild(td_score);
        document.getElementById('highscores').appendChild(tr);

        // add name and score to the table
        td_name.innerText = name_arr[i];
        td_score.innerText = score_arr[i];

        // add class to the table
        if (name_arr[i] == Uname) {
            td_name.classList.add('current-user');
            td_score.classList.add('current-user');
        }

    }

}