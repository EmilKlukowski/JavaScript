// const {
//   readFile,
//   writeFile,
//   readdir,
//   stat
// } = require('fs').promises;
//
//
//
// (async () => {
//   try {
//     const data = await (readFile('D:\\Users\\Emil\\WebstormProjects\\Kurs\\data\\input1.json', 'utf-8'));
//     const arrToSum = JSON.parse(data);
//
//     let sum = 0;
//     for (const arrToSumElement of arrToSum) {
//       sum += arrToSumElement;
//     }
//
//
//     await writeFile('D:\\Users\\Emil\\WebstormProjects\\Kurs\\data\\sum.txt', String(sum));
//
//   } catch (err) {
//     console.log("Something went wrong: ", err);
//   }
// })();
//
// Zadania tydz 2 dzien 2
//
// const {basename, dirname, extname} = require("path");
//
// const userPath = process.argv[2];
//
// //pełna ściezka
// console.log("pelna sciezka", dirname(userPath)+"\\"+basename(userPath));
// //nazwa pliku
// console.log("basename", basename(userPath));
// //katalog nadrzedny
// console.log("dirname", dirname(userPath));
// //rozszerzenie
// console.log("extname", extname(userPath));
//
// 2====================================================
// najlepsza opcja na bezpieczne łączenie sciezek
// const{join, normalize, resolve} = require("path");
// const path = require('path');
//
// function safeJoin(base, target){
//
//   const targetPath = "." + path.normalize("/" + target);
//   return path.resolve(base, targetPath);
// }
//
//
// const final = safeJoin(__dirname, process.argv[2]);
// console.log(final);
//
// Zad tydzien 2 dzien 3 ==========================================
//
// const{extname} = require("path");
// const{watch} = require("chokidar");
//
// const pathToWatch = process.argv[2];
//
// watch(pathToWatch, {
//     ignoreInitial: true,
//     awaitWriteFinish: true
//   })
//   .on("add",  path=>console.log(`File ${path} has been added`))
//   .on("change",  path=>console.log(`File ${path} has been changed`))
//   .on("unlink",  path=>console.log(`File ${path} has been removed`))
//   .on("addDir",  path=>console.log(`Dir ${path} has been added`))
//   .on("unlinkDir",  path=>console.log(`Dir ${path} has been removed`));

// const { watch } = require('chokidar');
//
// watch('D:\\Users\\Emil\\JS\\WebstormProjects\\Kurs\\**\\*.js', {
//   ignoreInitial: true,
//   awaitWriteFinish: true
// })
//   .on('change', path => console.log(`File ${path} has been changed`))
// .on('add', path => console.log(`File ${path} has been added`))
// .on('unlink', path => console.log(`File ${path} has been removed`));

//2 zadanie =======================================
//zeby sprawdzic czy dziala zmien nazwe pliku testowanie.js

const { watch } = require('chokidar');
const { readFile } = require("fs").promises;


const filePaths = new Map();

watch("D:\\Users\\Emil\\JS\\WebstormProjects\\Kurs\\**\\*.js",{
  awaitWriteFinish: true,
  ignoreInitial: true
  })
  .on("add",async path=> {
    if(!filePaths.has(path)) {
      const content = await readFile(path, "utf-8");
      console.log(`File ${path} has been added: ${content}`);
      filePaths.set(path, true);
    }
  })
  .on("change",async path => {
    if(!filePaths.has(path)) {
      const content = await readFile(path, "utf-8", );
      console.log(`File ${path} has been changed: ${content}`);
      filePaths.set(path, true);
    }
  });
