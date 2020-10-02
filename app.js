const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { type } = require("os");

const team = [];

// Function for gathering info for team manager.
function managerInfo() {
    console.log("Please enter the information of each of the members on your team, starting with your team mamnager.");
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of your team manager?"
            },
            {
                type: "input",
                name: "id",
                message: "What is your team manager's ID number?"
            },
            {
                type: "input",
                name: "email",
                message: "What is your team manager's email?"
            },
            {
                type: "input",
                name: "office",
                message: "What is your team manager's office number?"
            }
        ])
        .then(function (data) {
            const manager = new Manager(data.name, data.id, data.email, data.office);
            team.push(manager);
            roleInfo();
        });
};

// Function for determining role for other members of team.
function roleInfo() {
    console.log("Add information for another team member.")
    inquirer
        .prompt([
            {
                type: "list",
                name: "role",
                message: "What is the role of the team member you are entering?",
                choices: [
                    "Engineer",
                    "Intern",
                ]
            }
        ])
        .then(function (data) {
            if (data.role === "Engineer") {
                engineerInfo();
            } else if (data.role === "Intern") {
                internInfo();
            }
        });
};

// Function for gathering info on engineer.
function engineerInfo() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of your engineer?"
            },
            {
                type: "input",
                name: "id",
                message: "What is your engineer's ID number?"
            },
            {
                type: "input",
                name: "email",
                message: "What is your engineers's email?"
            },
            {
                type: "input",
                name: "github",
                message: "What is your engineers's GitHub username?"
            }
        ])
        .then(function (data) {
            const engineer = new Engineer(data.name, data.id, data.email, data.github);
            team.push(engineer);
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "complete",
                        message: "Do you have more team members to add?",
                        choices: [
                            "Yes",
                            "No",
                        ]
                    }
                ])
                .then(function (data) {
                    if (data.complete === "Yes") {
                        roleInfo();
                    } else if (data.complete === "No") {
                        writeToFile(outputPath, render(team));
                    }
                });
        });
};

// Function for gathering info on intern.
function internInfo() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of your intern?"
            },
            {
                type: "input",
                name: "id",
                message: "What is your interns's ID number?"
            },
            {
                type: "input",
                name: "email",
                message: "What is your interns's email?"
            },
            {
                type: "input",
                name: "school",
                message: "Where does your intern attend school?"
            }
        ])
        .then(function (data) {
            const intern = new Intern(data.name, data.id, data.email, data.school);
            team.push(intern);
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "complete",
                        message: "Do you have more team members to add?",
                        choices: [
                            "Yes",
                            "No",
                        ]
                    }
                ])
                .then(function (data) {
                    if (data.complete === "Yes") {
                        roleInfo();
                    } else if (data.complete === "No") {
                        writeToFile(outputPath, render(team));
                    }
                });
        });
};

// Function to write information gathered on team to team.html.
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function(err) {
    
        if (err) {
          return console.log(err);
        }
      
        console.log("HTML for team info created!");
      
      });
}

// Call for managerInfo function to initialize application.
managerInfo();