const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { constants } = require("crypto");

const employees = [];


const questions = () =>
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name? ",
    },

    {
      type: "list",
      name: "role",
      message: "What is your role?",
      choices: ["Engineer", "Intern", "Manager"],
    },

    {
      type: "input",
      name: "id",
      message: "What is your employee ID?",
    },

    {
      type: "input",
      name: "email",
      message: "What is your emmail?",
    },

    {
      type: "input",
      name: "phone",
      message: "What is your office phone number?",
      when: (answers) => answers.role === "Manager",
 
    },

    //'when' is used to filter out questions according to the role.
    {
      type: "input",
      name: "github",
      message: "What is your github username?",
      when: (answers) => answers.role === "Engineer",
  
    },

    {
      type: "input",
      name: "school",
      message: "What is your school/college name?",
      when: (answers) => answers.role === "Intern",
  
    }
  ])
  .then(function (userResponse) {
    console.log(userResponse);
    
  
    const { name, role, email, id, phone, github, school } = userResponse;
  
    let employee;
    switch (role) {
      case "Engineer":
        employee = new Engineer(name, id, email, github);
        addMoreMember()
        break;
  
      case "Manager":
        employee = new Manager(name, id, email, phone);
        addMoreMember()
        break;
  
      case "Intern":
        employee = new Intern(name, id, email, school);
        addMoreMember()
    }
  
    employees.push(employee);
});
questions()

function generateFile() {
  const html = render(employees);

  fs.writeFile(outputPath, html, function (error) {
    if (error) {
      return console.log(error);
    } else {
      console.log("The html is now generated Successfully");
    }
  })
};

 function addMoreMember() {
  inquirer.prompt(
    {
      type: "confirm",
      name: "addMore",
      message: "Do you want to add more members?",
    }).then(
      function ({ addMore }) {
      console.log("add More members", addMore)
      if (addMore) {
         questions();
      } else {
          generateFile()
      }
    }
   )
}

 
