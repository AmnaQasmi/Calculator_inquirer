#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const sleep = () => {
    return new Promise((res) => (
        setTimeout(res, 4000)
    ))
}

async function Welcome() {
    let rainbowTitle = chalkAnimation.rainbow('Lets Start Calculating With Me'); //it will start
    await sleep();
    rainbowTitle.stop();
    console.log( `
        _____________________
       |  _________________  |
       | | JO           0. | |
       | |_________________| |
       |  ___ ___ ___   ___  |
       | | 7 | 8 | 9 | | + | |
       | |___|___|___| |___| |
       | | 4 | 5 | 6 | | - | |
       | |___|___|___| |___| |
       | | 1 | 2 | 3 | | x | |
       | |___|___|___| |___| |
       | | . | 0 | = | | / | |
       | |___|___|___| |___| |
       |_____________________| `);
}
await Welcome();
async function askQuestion() {

    const answers = await inquirer
        .prompt([
            {
                type: "list",
                name: "operation",
                message: "select the operation you want to perform ? \n ",
                choices: ["Addition", "Subtraction", "Multiplication", "Division"],
            },
            {
                type: "number",
                name: "num1",
                message:chalk.bgCyanBright(`"Enter the first number : "`),
            },
            {
                type: "number",
                name: "num2",
                message: chalk.bgCyanBright(`"Enter the second number : "`),
            }


        ]);

    if
        (answers.operation == "Addition") {
        console.log(chalk.green(`${answers.num1} + ${answers.num2} = ${answers.num1 + answers.num2}`));
    }
    else if
        (answers.operation == "Subtraction") {
        console.log(chalk.green(`${answers.num1} - ${answers.num2} = ${answers.num1 - answers.num2}`));
    }
    else if
        (answers.operation == "Multiplication") {
        console.log(chalk.green(`${answers.num1} * ${answers.num2} = ${answers.num1 * answers.num2}`));
    }
    else if
        (answers.operation == "Division") {
        console.log(chalk.green(`${answers.num1} / ${answers.num2} = ${answers.num1 / answers.num2}`));
    }
};




// askQuestion();
async function startAgain() {
    do {
        await askQuestion();
        var again = await inquirer.prompt({
            type: "input",
            name: "restart",
            message: "Do you want to continue ? type yes or no :"
        })
    } while (again.restart == 'yes' || again.restart == 'Yes' || again.restart == 'y' || again.restart == 'Y');
}

startAgain();
