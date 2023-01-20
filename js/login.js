const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const passwordMessage = document.getElementById("errorMessageLogin");

let error;

// create users place in localStorage
const users = JSON.parse(localStorage.getItem("users")) || [];

// helper function -> check if email is correct

const checkEmail = (email) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (re.test(email)) {
    return true;
  } else {
    return false;
  }
};

// helper function - check if username is correct
function isUsernameCorrect(email) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return true;
    }
  }
  return false;
}
// helper function - check if password is correct
function isPasswordCorrect(password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const hashedPassword = btoa(password);
  for (let i = 0; i < users.length; i++) {
    if (users[i].password === hashedPassword) {
      return true;
    }
  }
  return false;
}
//validation
const loginValidate = (email, password) => {
  if (isUsernameCorrect(email) && isPasswordCorrect(password)) {
    const getUsername = JSON.parse(localStorage.getItem("users"));
    console.log(getUsername);
    for (let i = 0; i < getUsername.length; i++) {
      if (getUsername[i].email === email) {
        username = getUsername[i].username;
        localStorage.setItem("username", username);
        console.log(username);
        break;
      }
    }
    window.location.href = "/templates/app.html";
  } else if (!isUsernameCorrect(email)) {
    error = "Adres email nie jest poprawny";
    emailMessage.innerHTML = error;
  } else if (!isPasswordCorrect(password)) {
    error = "Hasło nie jest poprawne";
    passwordMessage.innerHTML = error;
  }
};

const loginUser = (email, password) => {
  localStorage.setItem(email, password, JSON.stringify(users));
};

// run scripts
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginValidate(inputEmail.value, inputPassword.value);
});

inputEmail.addEventListener("change", (e) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (checkEmail(inputEmail.value)) {
    if (e.target.value !== users.username) {
      error = "Nie ma konta o takim adresie email, stwórz teraz!";
      passwordMessage.innerHTML = error;
    }
  }
});
