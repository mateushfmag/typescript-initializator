#! /usr/bin/env node
const { exec } = require("child_process");
const { promisify } = require("util");
const fs = require("fs/promises");
const path = require("path");

const promiseExec = promisify(exec);

const devDeps = [
  "@types/jest",
  "eslint",
  "eslint-config-prettier",
  "eslint-config-standard-with-typescript",
  "eslint-plugin-import",
  "eslint-plugin-node",
  "eslint-plugin-promise",
  "git-commit-msg-linter",
  "husky",
  "jest",
  "lint-staged",
  "sucrase",
  "ts-jest",
  "ts-node",
  "typescript",
];

const createFiles = async () => {
  const folderPath = path.resolve(__dirname, "..", "filesToCreate");
  const files = await fs.readdir(folderPath);
  const promises = files.map(async (file) => {
    const currentDirectory = process.cwd();
    const filePath = path.resolve(currentDirectory, file);
    const fileToRead = path.resolve(folderPath, file);
    await fs.copyFile(fileToRead, filePath);
    return;
  });
  await Promise.all(promises);
};

const run = async () => {
  await promiseExec("npm init -y");
  const promises = [
    promiseExec(`npm i -D ${devDeps.join(" ")}`),
    createFiles(),
  ];
  await Promise.all(promises);
};

console.log("Installing dev deps...");
run()
  .then(() => {
    console.log("Successful initialized project!");
  })
  .catch((e) => {
    console.error("An error has occurred");
    console.error(e);
  });
