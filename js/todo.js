"use strict";

const translations = {
  en: {
    title: "ToDo List",
    add: "Add",
    placeholder: "Write Your Task",
    logout: "Log out",
    switch: "Arabic"
  },
  ar: {
    title: "قائمة المهام",
    add: "أضف",
    placeholder: "اكتب مهمتك",
    logout: "تسجيل الخروج",
    switch: "الانجليزية"
  }
};
function applyTranslations(lang) {
  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    el.textContent = translations[lang][key];
  });

document.querySelectorAll("[data-placeholder]").forEach(el => {
    const key = el.getAttribute("data-placeholder");
    el.placeholder = translations[lang][key];
  });
  document.querySelector(".translate").textContent = translations[lang].switch;

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

class Task{
   constructor(textEn, textAr) {
    this.textEn = textEn;
    this.textAr = textAr;
    this.done = false;
  }
    toggleDone(){
        this.done=!this.done;
}
getText(lang){
 if (lang === "ar" && this.textAr) return this.textAr;
  if (lang === "en" && this.textEn) return this.textEn;
  // fallback if missing one translation
  return this.textAr || this.textEn || "";
  
}
}
class ToDoList{
    constructor(listElement,userEmail){
        this.listElement=listElement;
        this.userEmail=userEmail;
        this.tasks=this.loadTasks();
}
saveTasks(){
    localStorage.setItem(`tasks ${this.userEmail}`,JSON.stringify(this.tasks));
}
loadTasks(){
let data = localStorage.getItem(`tasks ${this.userEmail}`);
  if (!data) {
    return []; 
  }

  let parsed = JSON.parse(data);
  let tasks = [];

  for (let obj of parsed) {
    let task = new Task(obj.textEn,obj.textAr); 
    task.done = obj.done;          
    tasks.push(task);
  }

  return tasks;
}
addTask(textTask){
 let NewTask;
  if (currentLang === "ar") {
    NewTask = new Task("", textTask);  
  } else {
    NewTask = new Task(textTask, "");  
  }
this.tasks.push(NewTask);
this.saveTasks();
this.render();
}
removeTask(index){
    this.tasks.splice(index, 1);
    this.saveTasks();
}
toggleTask(index){
this.tasks[index].toggleDone();
}
editTask(index,newText){
   if (this.tasks[index]) {
  if (currentLang === "ar") {
    this.tasks[index].textAr = newText;
  } else {
    this.tasks[index].textEn = newText;
  }
}
}
//render
render() {
  this.listElement.innerHTML = "";
  this.tasks.forEach((task, index) => {
    let li=document.createElement("li");
    let left = document.createElement("div");
    // left.style.cssText="display:flex; align-items:center;"
    let doneIcon=document.createElement("i")
   
    doneIcon.classList.add("fa-regular","fa-circle-check") 
    doneIcon.addEventListener("click", () => {
      this.toggleTask(index); 
      this.saveTasks();       
      this.render();   
          
    });
   
    let taskText = document.createElement("span");
    // let lang = localStorage.getItem("lang") || "en";  
    // taskText.textContent = task.getText(lang);
   taskText.textContent = task.getText(currentLang);

    // line-through 
    taskText.style.textDecoration = task.done ? "line-through" : "none";
if (task.done) {
  doneIcon.style.cssText ="color:green";   
}

left.appendChild(doneIcon);
left.appendChild(taskText);
li.appendChild(left)
    // let ul = document.querySelector("ul");
    let icons=document.createElement("div")
//delete icon
let deleteTask=document.createElement("i")
deleteTask.classList.add("fa-solid","fa-trash")
deleteTask.style.cssText="margin-inline-end:1rem;"
deleteTask.addEventListener("click",()=>{
this.removeTask(index);
this.saveTasks();
this.render();
});
icons.appendChild(deleteTask);
//edit
let edit=document.createElement("i");
edit.classList.add("fa-solid","fa-pen-to-square");
edit.addEventListener("click",(e)=>{
  e.stopPropagation();
taskText.contentEditable="true";
taskText.focus();

taskText.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      taskText.contentEditable = "false";
      this.editTask(index, taskText.textContent); 
      this.saveTasks();                           
      this.render();   
    }                          
});
});
icons.appendChild(edit);
li.appendChild(icons)
this.listElement.appendChild(li);
  });
} 
} 

let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let userEmail = currentUser ? currentUser.email : null;

let todo = new ToDoList(document.querySelector("ul"),userEmail);
todo.render();
// 2. When button is clicked → call addTask()

document.getElementById("btn").addEventListener("click", function () {
  let taskInput = document.getElementById("task");
  if(taskInput.value.trim() !== "") {
    todo.addTask(taskInput.value.trim());  // 👈 here we are CALLING addTask()
    taskInput.value = ""; // clear input
  }else{
    alert("please insert task");

  }
});
document.querySelector(".logout").addEventListener("click", () => {
  localStorage.removeItem("currentUser"); 
  window.location.href = "login.html"; 
});
