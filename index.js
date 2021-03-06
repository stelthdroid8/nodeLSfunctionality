#!/usr/bin/env node
//file system module
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

// const process = require('process');
//the process module is added into the global scope of every project

const { lstat } = fs.promises;
const targetDir = process.argv[2] || process.cwd();
fs.readdir(targetDir, async (err, fileNames) => {
  if (err) {
    console.log('error: ', err);
  }

  const statPromises = fileNames.map(filename => {
    return lstat(path.join(targetDir, filename));
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (!stats.isFile()) {
      console.log(chalk.yellow(fileNames[index]));
    } else {
      console.log(chalk.bold(fileNames[index]));
    }
  }
  //   wrap last call in a promise and use async/wait

  //   for (let file of fileNames) {
  //     try {
  //       stats = await lstat(file);
  //       console.log(file, stats.isFile());
  //     } catch (err) {
  //       console.log('something went wrong: ', err);
  //     }
  //   }
  //   promise based implementation of the fs modules

  //   using an array to keep track of the callbacks and what file belongs where
  //   const allStats = Array(fileNames.length).fill(null);

  //   for (let file of fileNames) {
  //     const index = fileNames.indexOf(file);
  //     fs.lstat(file, (err, stats) => {
  //       if (err) {
  //         console.log('error: ', err);
  //       }
  //       allStats[index] = stats;

  //       const ready = allStats.every(stats => {
  //         return stats;
  //       });
  //       if (ready) {
  //         allStats.forEach((stats, index) => {
  //           console.log(fileNames[index], stats.isFile());
  //         });
  //       }
  //     });
  //   }

  // warpping lstat in a promise to use async/wait funcitonality

  //   const lstat = file => {
  //     return newPromise((resolve, reject) => {
  //       fs.lstat(file, (err, stats) => {
  //         if (err) {
  //           reject(err);
  //         }
  //         resolve(stats);
  //       });
  //     });
  //   };
});
