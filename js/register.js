const registerBtn = document.getElementById("register");
const inputUsername = document.getElementById("username");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputRepeatEmail = document.getElementById("repeatEmail");
const usernameErrorMessage = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordMessage = document.getElementById("passwordError");
const repeatedEmailMessage = document.getElementById("repeatedEmailError");

let error;

const validateValue = (value) => {
  const letterCount = value.replace(/[^a-z]/g, "").length;
  const digitCount = value.replace(/[^0-9]/g, "").length;
  const validChars = new RegExp("^[a-z0-9_\\-\\[\\]\\\\/]+$");
  return validChars.test(value) && letterCount >= 5 && digitCount >= 1;
};

// helper function -> login user after execute register function

const loginUserAfterRegistration = (email, username, password) => {
  console.log("work");
  const usersData = JSON.parse(localStorage.getItem("users"));

  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].email === email) {
      username = usersData[i].username;
      localStorage.setItem("username", username);
      console.log(username);
      break;
    }
  }
  localStorage.setItem(email, password, JSON.stringify(users));
};
function userExists(email) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return true;
    }
  }
  return false;
}

// helper function -> check if email is correct

const checkEmail = (email) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (re.test(email)) {
    if (validateValue(inputUsername.value)) {
      validate(
        inputUsername.value,
        inputEmail.value,
        inputRepeatEmail.value,
        inputPassword.value
      );
    } else {
      error =
        "Nazwa użytkownika musi zawierać co najmniej 5 liter i jedną cyfrę";
      usernameErrorMessage.innerHTML = error;
    }
  } else {
    error = "Adres e-mail jest nieprawidłowy!";
    repeatedEmailMessage.innerHTML = error;
  }
};

// helper function -> check if username exists

const usernameExists = (username) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      return true;
    }
  }
  return false;
};

// validate function

const validate = (username, email, repeatedEmail, password) => {
  if (username.length < 6) {
    usernameErrorMessage.innerHTML = "za mało znaków dla użytkownika";
  } else if (username.length > 16) {
    usernameErrorMessage.innerHTML = "za dużo znaków dla użytkownika";
  } else if (email !== repeatedEmail) {
    repeatedEmailMessage.innerHTML = error;
  } else if (password.length < 6) {
    error = "za mała ilość znaków";
    passwordMessage.innerHTML = error;
  } else if (userExists(inputEmail.value)) {
    error = "użytkownik o podanym adresie e-mail już istnieje";
    repeatedEmailMessage.innerHTML = error;
  } else if (usernameExists(inputUsername.value)) {
    usernameErrorMessage.innerHTML = "Użytkownik istnieje. Zmień nazwę";
  } else if (email && username && repeatedEmail && password === null) {
    error = "Nie podano danych";
    repeatedEmailMessage.innerHTML = error;
  } else {
    registerUser(inputUsername.value, inputEmail.value, inputPassword.value);
    loginUserAfterRegistration(
      inputEmail.value,
      inputUsername.value,
      inputPassword.value
    );
  }
};

// register user in localStorage
const registerUser = (username, email, user_password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const password = btoa(user_password);
  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "./app.html";
};

//run register functions
registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  checkEmail(inputEmail.value);
  validateValue(inputUsername.value);
});
