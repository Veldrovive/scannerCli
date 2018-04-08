#!/usr/bin/env node

import "babel-polyfill";
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import Configstore from 'configstore';
const conf = new Configstore('scannerCli');

import * as files from './lib/files.js';
import * as inquirer from './lib/inquirer.js';
import * as cmd from './lib/cmd.js';

const run = async () => {
  clear();
  console.log(
    chalk.yellow(
      figlet.textSync('Scanner', { horizontalLayout: 'full' })
    )
  );

  const ans = await inquirer.selectCommand();
  if(ans.command.toLowerCase() === "scan"){
    getScanInfo();
  }else if(ans.command.toLowerCase() === "location"){
    addLocation();
  }
}

const addLocation = async () => {
  const ans = await inquirer.addLocation();
  let locations = conf.get('locations') || [];
  if(locations.indexOf(ans.location) ===  -1){
    locations.push(ans.location);
    console.log("Added Location: ",ans.location);
  }else{
    locations = locations.filter((loc) => {return loc !== ans.location});
    console.log("Removed Location: ",ans.location);
  }
  conf.set('locations', locations);
  setTimeout(() => {run()}, 2000);
}

const getScanInfo = async () => {
  const ans = await inquirer.askQuestions(conf.get('family'), conf.get("device"));
  conf.set('family', ans.family);
  conf.set('device', ans.device);
  if(ans.type.toLowerCase() === 'learn'){
    const loc = await inquirer.selectLocation(conf.get('locations'));
    const bool = await inquirer.confirm("You wish to Learn the Location "+loc.location+" to the Family "+ans.family+" with the Device "+ans.device+"?");
    if(bool.con){
      try{
        await cmd.run("sudo docker stop scanner");
        await cmd.run("sudo docker start scanner");
        cmd.run('sudo docker exec scanner sh -c "find3-cli-scanner -i wlan0 -device '+ans.device.toLowerCase()+' -family '+ans.family.toLowerCase()+' -server https://cloud.internalpositioning.com -scantime 100  -forever -location '+loc.location.toLowerCase()+'"');
        await inquirer.awaitKey("Learning. Press enter to stop.");
        console.log("Shutting down");
        await cmd.run("sudo docker stop scanner");
        console.log("Done");
        setTimeout(() => {run()}, 2000);
      }catch(err){
        console.log("Failed to run commands");
        setTimeout(() => {run()}, 2000);
      }
    }else{
      run();
    }
  }else{
    const bool = await inquirer.confirm("You wish to Scan the current location the Family "+ans.family+" with the Device "+ans.device+"?");
    if(bool.con){
      try{
        await cmd.run("sudo docker stop scanner");
        await cmd.run("sudo docker start scanner");
        cmd.run('sudo docker exec scanner sh -c "find3-cli-scanner -i wlan0 -device '+ans.device.toLowerCase()+' -family '+ans.family.toLowerCase()+' -server https://cloud.internalpositioning.com -scantime 100  -forever"');
        await inquirer.awaitKey("Scanning. Press enter to stop.");
        console.log("Shutting down");
        await cmd.run("sudo docker stop scanner");
        console.log("Done");
        setTimeout(() => {run()}, 2000);
      }catch(err){
        console.log("Failed to run commands");
        setTimeout(() => {run()}, 2000);
      }
    }else{
      run();
    }
  }
}

run();

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
    cmd.run("sudo docker stop scanner")
      .then(() => {
        console.log("Stopping all");
      })
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
