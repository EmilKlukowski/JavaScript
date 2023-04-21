{
  //   const {exec} = require("child_process");
  // //cwd (pwd) current (print) working dir uruchomi się w C:\\
  // //nazwy przekazywane jako zmienne środowiskowe
  // // timeout: 1000, po sekundzie koniec
  // const cp = exec("ping 8.8.8.8", {
  //
  //
  // });  //cp to ChildProcess
  //
  // cp.on("close", ()=>{
  //   console.log("Finished!");
  // });
  //
  // //SIGKILL -> bezwarunkowe zabicie procesu
  // setTimeout(()=>{
  //   cp.kill("SIGKILL");
  // }, 1000);
}

// const {exec} = require("child_process");
// const cp = exec("dir");
//
// cp.stdout.on("data", data=>{
//   console.log("Out> ", data);
// });
//
// cp.stderr.on("data", err=>{
//   console.log("Error ", err);
// })
//
// cp.on("close", ()=>{
//   console.log("Finished");
// })

//promisy w cp =========================================
// const {promisify} = require("util");
// const exec = promisify(require("child_process").exec);
//
// const ip = process.argv[2].replace(/[^0-9.]+/g, "");
//
//
// (async ()=>{
//   try {
//     const {stdout} = await exec(`ping ${ip}`);
//     console.log(stdout);
//   }catch (e){
//     console.error("Oh no, ", e.stdout);
//   }
// })();

//1===============================
// const {promisify} = require("util");
// const exec = promisify(require("child_process").exec);
//
// const userInput = process.argv[2];
//
// //mspaint.exe    calc.exe
// (async ()=>{
//  try{
//    const cp = await exec(`${userInput}`, {
//      timeout: 2000
//    });
//  }catch (e){
//  console.log(e);
//  }
// })();

//2================================

const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const {
  normalize,
  resolve,
} = require('path');
const path = require('path');

function safeJoin(base, target) {

  const targetPath = '.' + path.normalize('/' + target);
  return path.resolve(base, targetPath);
}

const userInput = process.argv[2];
const safePath = safeJoin(__dirname, userInput);

(async () => {
  try{
    const { stdout } = await exec("dir", {
      cwd: `${safePath}`
    });
    console.log(stdout);
  }catch (e) {
    console.error("Oh no", e);
  }
})();
