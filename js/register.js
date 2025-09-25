"use strict";
const registerTranslations = {
  en: {
     welcome: "Welcome to TodoApp",
    organize: "Organize your tasks efficiently",
    register: "Register",
    fnamePlaceholder: "Enter Your First Name",
    lnamePlaceholder: "Enter Your Last Name",
    emailPlaceholder: "Enter Your Email",
    passwordPlaceholder: "Enter Your Password",
    logout: "Log out",
    regBtn: "Sign Up",
    switch: "Arabic"
  },
  ar: {
     welcome: "مرحبًا بك في تطبيق المهام",
    organize: "نظم مهامك بكفاءة",
    register: "إنشاء حساب",
    fnamePlaceholder: "أدخل اسمك الأول",
    lnamePlaceholder: "أدخل اسمك الأخير",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    passwordPlaceholder: "أدخل كلمة المرور",
    regBtn: "تسجيل",
     logout: "تسجيل الخروج",
    switch: "الإنجليزية"
  }
};
function applyTranslations(lang) {
  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    el.textContent = registerTranslations[lang][key];
  });

document.querySelectorAll("[data-placeholder]").forEach(el => {
    const key = el.getAttribute("data-placeholder");
    el.placeholder = registerTranslations[lang][key];
  });
  document.querySelector(".translate").textContent = registerTranslations[lang].switch;

   document.documentElement.lang = lang;
  document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";
}

let currentLang = localStorage.getItem("lang") || "en";
applyTranslations(currentLang);
document.querySelector(".translate").addEventListener("click", () => {
  currentLang = (currentLang === "en") ? "ar" : "en";
  localStorage.setItem("lang", currentLang);
  applyTranslations(currentLang);
  todo.render();  
});


function register(){
    let email=document.getElementById("email").value;
    let pass=document.getElementById("password").value;
    let fname=document.getElementById("fname").value;
    let lname=document.getElementById("lname").value;
    
let usersData=localStorage.getItem("users") ;
let users;
if(usersData){
    users = JSON.parse(usersData);
} else {
    users = [];
}
let userExists=false;
let foundUser;
for(let user of users){
   if(user.email===email ){ 
    userExists=true;
    foundUser=user;
    break;
   }
}
if(userExists){
    alert("This email is used bafore");
document.getElementById("email").value="";

return;
}else{
    let newUser = {
    email: email,
    password: pass,
    firstName: fname,
    lastName: lname
};

users.push(newUser);
localStorage.setItem("users", JSON.stringify(users));
// alert("Register successful");
window.location.href="login.html";
}
}
// document.getElementById("reg-btn").addEventListener("click",function(e){
// e.preventDefault();
// register();})
document.querySelector(".logout").addEventListener("click", () => {
  localStorage.removeItem("currentUser"); 
  window.location.href = "login.html"; 
});


