"use strict";
const loginTranslations = {
  en: {
    welcome: "Welcome to TodoApp",
    organize: "Organize your tasks efficiently",
    login: "Login",
    emailPlaceholder: "Enter Your Email",
    passwordPlaceholder: "Enter Your Password",
    logout: "Log out",
    switch: "Arabic",
  },
  ar: {
    welcome: "مرحبًا بك في تطبيق المهام",
    organize: "نظم مهامك بكفاءة",
    login: "تسجيل الدخول",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    passwordPlaceholder: "أدخل كلمة المرور",
    logout: "تسجيل الخروج",
    switch: "الإنجليزية",
  },
};
function applyTranslations(lang) {
  document.querySelectorAll("[data-translate]").forEach((el) => {
    const key = el.getAttribute("data-translate");
    el.textContent = loginTranslations[lang][key];
  });
  //placeholder
  document.querySelectorAll("[data-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-placeholder");
    el.placeholder = loginTranslations[lang][key];
  });
  document.querySelector(".translate").textContent =
    loginTranslations[lang].switch;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

let currentLang = localStorage.getItem("lang") || "en";
applyTranslations(currentLang);
document.querySelector(".translate").addEventListener("click", () => {
  currentLang = currentLang === "en" ? "ar" : "en";
  localStorage.setItem("lang", currentLang);
  applyTranslations(currentLang);
});
function login() {
  let email = document.getElementById("email").value.trim();
  let pass = document.getElementById("password").value.trim();

  //got users
  let usersData = localStorage.getItem("users");
  let users;
  if (usersData) {
    users = JSON.parse(usersData);
  } else {
    users = [];
  }
  //check existing
  let userExists = false;
  let foundUser;
  for (let user of users) {
    if (user.email === email && user.password === pass) {
      userExists = true;
      foundUser = user;
      break;
    }
  }
  if (userExists) {
    console.log("Login successful");
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    window.location.href = "todo.html";
  } else {
    alert("Account not Found ,Please register");
    let goToRegister = confirm("do you want to go to Register");
    if (goToRegister) {
      window.location.href = "register.html";
    }
  }
}
document.getElementById("log-btn").addEventListener("click", function (e) {
  e.preventDefault();
  login();
});
//register
function register() {
  let email = document.getElementById("email").value;
  let pass = document.getElementById("password").value;
  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;

  let usersData = localStorage.getItem("users");
  let users;
  if (usersData) {
    users = JSON.parse(usersData);
  } else {
    users = [];
  }
  let userExists = false;
  let foundUser;
  for (let user of users) {
    if (user.email === email) {
      userExists = true;
      foundUser = user;
      break;
    }
  }
  if (userExists) {
    alert("This email is used bafore");
    document.getElementById("email").value = "";

    return;
  } else {
    let newUser = {
      email: email,
      password: pass,
      firstName: fname,
      lastName: lname,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    // alert("Register successful");
    window.location.href = "login.html";
  }
}
// document.getElementById("reg-btn").addEventListener("click",function(e){
// e.preventDefault();
// register();})
document.querySelector(".logout").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});
