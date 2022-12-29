const signUpBtnLink = document.querySelector('.signUpBtn-link');
const signInBtnLink = document.querySelector('.signInBtn-link');
const wrapper = document.querySelector('.wrapper');
const signUpForm = document.getElementById('signUpForm');



signUpBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});

signInBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});

//  <-- Sign Up -->
function signUp(e) {
    sername = document.getElementById('user-name').value,
        email = document.getElementById('email').value,
        pwd = document.getElementById('pwd').value;

    let formData = JSON.parse(localStorage.getItem('formData')) || [];

    let exist = formData.length &&
        JSON.parse(localStorage.getItem('formData')).some(data =>
            data.username.toLowerCase() == username.toLowerCase() &&
            data.pwd == pwd
        );

    if (!exist) {
        formData.push({ username, email, pwd });
        localStorage.setItem('formData', JSON.stringify(formData));
        document.querySelector('form').reset();
        document.getElementById('user-name').focus();
        alert("Account Created.\n\nPlease Sign In.");
    }
    else {
        alert("Ooopppssss... Duplicate found!!!\nYou have already sigjned up");
    }
    e.preventDefault();
}

// <-- Sign In -->
function signIn(e) {
    let username = document.getElementById('userName').value,
        pwd = document.getElementById('pswd').value;

    let formData = JSON.parse(localStorage.getItem('formData')) || [];

    let exist = formData.length &&
        JSON.parse(localStorage.getItem('formData')).some(data =>
            data.username.toLowerCase() == username.toLowerCase() &&
            data.pwd == pwd
        );

    if (!exist) {
        alert("Invalid Username or Password");
        handleIncorrectLogin(username);
    }
    else {
        //location.href = "../html/home.html";
        localStorage.setItem('currentUser', JSON.stringify(username));
        location.href = "../html/xo_game.html";

    }
    e.preventDefault();
}


//  <-- block user name after 3 attempts in succession for 3 second and after tha user can ba able try agein-->
function handleIncorrectLogin(username) {
    let incorrectLogin = JSON.parse(localStorage.getItem('incorrectLogin')) || [];
    let exist = incorrectLogin.length &&
        JSON.parse(localStorage.getItem('incorrectLogin')).some(data =>
            data.username.toLowerCase() == username.toLowerCase()
        );

    if (!exist) {
        incorrectLogin.push({ username, count: 1 });
        localStorage.setItem('incorrectLogin', JSON.stringify(incorrectLogin));
    }
    else {
        let index = incorrectLogin.findIndex(data => data.username.toLowerCase() == username.toLowerCase());
        incorrectLogin[index].count += 1;
        localStorage.setItem('incorrectLogin', JSON.stringify(incorrectLogin));
    }

    let index = incorrectLogin.findIndex(data => data.username.toLowerCase() == username.toLowerCase());
    if (incorrectLogin[index].count >= 3) {
        let time = 3;
        let interval = setInterval(() => {
            document.getElementById('userName').disabled = true;
            document.getElementById('pswd').disabled = true;
            document.getElementById('signInBtn').disabled = true;
            document.getElementById('signInBtn').style.backgroundColor = 'rgba(256, 256, 256, 0.5)';
            document.getElementById('signInBtn').innerText = `Please wait ${time} seconds`;
            document.getElementById('signInBtn').style.color = '#f4157e';
            time--;
            if (time < 0) {
                document.getElementById('userName').disabled = false;
                document.getElementById('pswd').disabled = false;
                document.getElementById('signInBtn').disabled = false;
                document.getElementById('signInBtn').style.backgroundColor = '#f4157e';
                document.getElementById('signInBtn').innerText = `Sign In`;
                document.getElementById('signInBtn').style.color = '#fff';
                clearInterval(interval);
            }
        }, 1000);
    }
}
