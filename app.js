const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
let employeeID = 1;
let employeeList = [];

function managerPrompt() {
    inquirer.prompt([
        {
            type: "input",
            message: "Manager name:",
            name: "managerName"
        },
        {
            type: "input",
            message: "email address?",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "Office number?",
            name: "office"
        },
    ])
        .then(function (response) {
            let managerName = response.managerName;
            let managerEmail = response.managerEmail;
            let office = response.office;
            let manager = new Manager(
                managerName,
                employeeID,
                managerEmail,
                office
            );
            employeeList.push(manager);
            employeeID++;

            console.log(`
                we will now collect info on employees
            `);
            employeePrompt();
        });
}
function employeePrompt() {
    inquirer.prompt([
        {
            type: "list",
            message: "what type of employee",
            choices: ["engineer", "intern"],
            name: "employeeType"
        },
        {
            type: "input",
            message: "employee name?",
            name: "employeeName"
        },
        {
            type: "input",
            message: "employee email",
            name: "employeeEmail"
        }
    ]).then(function (response) {
        let employeeType = response.employeeType;
        let employeeName = response.employeeName;
        let employeeEmail = response.employeeEmail;

        if (employeeType === "engineer") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "github username?",
                    name: "githubName"
                },
                {
                    type: "list",
                    message: "do you have more employees?",
                    choices: ["yes", "no"],
                    name: "newEmployees"
                }
            ])
                .then(function (response) {
                    let employeeGithub = response.githubName;
                    let engineer = new Engineer(
                        employeeName,
                        employeeID,
                        employeeEmail,
                        employeeGithub
                    );

                    employeeList.push(engineer);
                    employeeID++;

                    if (response.newEmployees === "yes") {
                        employeePrompt();
                    } else {
                        render();
                        return
                    }
                });
        } else {
            inquirer.prompt([
                {
                    type: "input",
                    message: "what school?",
                    name: "school"
                },
                {
                    type: "list",
                    message: "do you have more employees?",
                    choices: ["yes", "no"],
                    name: "newEmployees"
                }

            ]).then(function (response) {
                let school = response.school;

                let intern = new Intern(
                    employeeName,
                    employeeID,
                    employeeEmail,
                    school);
                employeeList.push(intern);
                employeeID++;
                if (response.newEmployees === "yes") {
                    employeePrompt();
                } else {
                   render();
                    return;
                }
            });
        }
    })
}
managerPrompt();