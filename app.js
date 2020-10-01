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


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function manager() {
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
            const manager = new Manager(data.name, data.id, data.email, data.office)
            console.log(manager);
            role();
        });
};

function role() {
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
                engineer();
            } else if (data.role === "Intern") {
                intern();
            }
        });
};

function engineer() {
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
            const engineer = new Engineer(data.name, data.id, data.email, data.github)
            console.log(engineer);
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
                        role();
                    } else if (data.complete === "No") {
                        return
                    }
                })
        });
}

function intern() {
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
            const intern = new Intern(data.name, data.id, data.email, data.school)
            console.log(intern);
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
                        role();
                    } else if (data.complete === "No") {
                        return
                    }
                })
        });
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

manager();