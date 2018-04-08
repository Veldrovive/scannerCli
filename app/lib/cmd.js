import cmd from 'node-cmd';

export const run = (command) => {
  return new Promise((resolve, reject) => {
    try{
      cmd.get(command, (err, data, stderr) => {
        if(err) return reject(err);
        resolve(data);
      })
    }catch(err){
      reject(err);
    }
  })
}
