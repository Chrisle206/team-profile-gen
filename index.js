const inquirer = require("inquirer");
const generateHtml = require('./generateHtml');
const fs = require('fs');
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const teamMembers = [];


function createTeam() {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Enter Manager\'s Name:'
        },
        {
            name: 'id',
            type: 'input',
            message: 'Enter Manager\'s Id:'
        },
        {
            name: 'email',
            type: 'input',
            message: 'Enter Manager\'s Email:'
        },
        {
            name: 'num',
            type: 'input',
            message: 'Enter Manager\'s office Number:'
        }
    ]).then(answers => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.num);
        teamMembers.push(manager);
        addEmployee();
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            name: "add",
            type: "list",
            choices: ["Add a Engineer", "Add a Intern", "Create Team"]
        }
    ]).then(answers => {
        switch (answers.add) {
            case "Add a Engineer":
                addEngineer();
                break;

            case "Add a Intern":
                addIntern();
                break;

            default:
                console.log("Generating team....")
                team();
                break;
        }
    })
}

function addEngineer() {
    inquirer.prompt([{
        name: "name",
        message: "Enter Employee\'s Name:",
        type: "input"
    },
    {
        name: "id",
        message: "Enter Employee\'s Id:",
        type: "input"
    },
    {
        name: "email",
        message: "Enter Employee\'s Email:",
        type: "input"
    },
    {
        name: "github",
        message: "Enter Employee\'s Github:",
        type: "input"
    }]).then(answers => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        teamMembers.push(engineer);
        addEmployee();
    })
}

function addIntern() {
    inquirer.prompt([{
        name: "name",
        message: "Enter Intern\'s Name:",
        type: "input"
    },
        {
            name: "id",
            message: "Enter Intern\'s Id:",
            type: "input"
        },
        {
            name: "email",
            message: "Enter Intern\'s Email:",
            type: "input"
        },
        {
            name: "school",
            message: "Enter Intern\'s School:",
            type: "input"
        }]).then(answers => {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            teamMembers.push(intern);
            addEmployee();
        })
}

function team() {
    fs.writeFile('index.html', generateHtml(teamMembers), (err) => {
        if (err) throw err;
        console.log('Html Generated!');
    });
}
createTeam();
