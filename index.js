#!/usr/bin/env node
//file system module
const fs = require('fs');

// const process = require('process');
//the process module is added into the global scope of every project

const currDir = process.cwd();
fs.readdir(currDir, (err, fileNames) => {
  if (err) {
    console.log('error: ', err);
    return;
  }

  console.log(fileNames);
});
