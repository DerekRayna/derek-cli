#!/usr/bin/env node

const path = require("path");
const program = require("commander");
const inquirer = require("inquirer");
const downloadGitRepo = require("download-git-repo");
const package = require("../package.json");
const templates = require('./templates.js')

// 定义当前版本
program.version(`v${package.version}`);

program
  .command("create")
  .description("创建模版")
  .action(async () => {
    const { name } = await inquirer.prompt({
      type: "input",
      name: "name",
      message: "请输入项目名称：",
    });
    console.log("项目名称：", name);

    const { template } = await inquirer.prompt({
      type: "list",
      name: "template",
      message: "请选择模版：",
      choices: templates, // 模版列表
    });
    console.log("模版：", template);

    // 目标文件夹 = 用户命令行所在目录 + 项目名称
    const dest = path.join(process.cwd(), name);
    // 开心下载模版
    downloadGitRepo(template, dest, (err) => {
      if (err) {
        console.log("创建模版失败", err);
      } else {
        console.log("创建模版成功");
      }
    });
  });

program.parse(process.argv);
