import inquirer from 'inquirer';
import files from './files.js';

export const selectCommand = () => {
  const questions = [
    {
      name: 'command',
      type: 'list',
      message: 'Do you want to add a Location or start a Scan?',
      choices: ["Location", "Scan"],
    }
  ];
  return inquirer.prompt(questions);
}

export const confirm = (question) => {
  const questions =[
    {
      name: 'con',
      type: 'confirm',
      message: question,
    }
  ];
  return inquirer.prompt(questions);
}

export const awaitKey = (inst) => {
  const questions =[
    {
      name: 'none',
      message: inst,
    }
  ];
  return inquirer.prompt(questions);
}

export const addLocation = () => {
  const questions =[
    {
      name: 'location',
      type: 'input',
      message: 'Enter a name for the location (Enter an already added location to delete it):',
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a name';
        }
      }
    }
  ];
  return inquirer.prompt(questions);
}

export const askQuestions = (defFam, defDev) => {
  const questions =[
    {
      name: 'type',
      type: 'list',
      message: 'Do you want to Learn or Scan?',
      choices: ["Learn", "Scan"],
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a name';
        }
      }
    },
    {
      name: 'family',
      type: 'input',
      message: 'Enter your Family name:',
      default: defFam,
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a name';
        }
      }
    },
    {
      name: 'device',
      type: 'input',
      message: 'Enter your Device name:',
      default: defDev,
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a name';
        }
      }
    }
  ];
  return inquirer.prompt(questions);
}

export const selectLocation = (locList) => {
  const question = [
    {
      name: 'location',
      type: 'list',
      message: 'Which location would you like to Learn?',
      choices: locList,
    }
  ];
  return inquirer.prompt(question);
}
