'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
var inquirer = require('inquirer');
var path = require('path');
var fs = require('fs');

var srcSource=__dirname;
var srcLen=srcSource.length+1;
var copyPath=process.cwd()+'/creatdir/';



function travel(dir) {

  fs.readdirSync(dir).forEach(function (file) {  

    var pathname = path.join(dir, file);  

    var myPath=path.join(copyPath,pathname.substring(srcLen));   
 
    if (fs.statSync(pathname).isDirectory()) {   
 
      var isExists=fs.existsSync(myPath);

      if (!isExists) { 
          fs.mkdirSync(myPath); 
          travel(pathname);  
      } 

    } else { 
       fs.createReadStream(pathname).pipe(fs.createWriteStream(myPath)); 
    }
  });
}

module.exports = () => { 
    

    // var dirPath=copyPath+"creatdirss";

    // console.log(dirPath)

    //  fs.exists(dirPath,function(exists){
    //       console.log(exists) 
    //   }) 

    //  return;

   
    // fs.mkdir(dirPath,function(err){
    //    if(err){
    //     console.log(err);
    //    }else{
    //     console.log("creat done!");
    //    }
    // }) 
   
    //拷贝文件
   // travel(srcSource);

     //fs.createReadStream(__dirname + '/../templates.json').pipe(fs.createWriteStream(process.cwd()+'/creatdir'));

   


    //是否存在
    if (config.tpl.length<=0) {
      console.log(chalk.red('\n × Template does not exit!'))
      process.exit()
    }

    let projects=Object.keys(config.tpl),
        branch,projectName;

    projects.push(new inquirer.Separator());
    projects.push( {
        name: '我是一只小小鸟',
        disabled: 'Unavailable at this time'
    }); 

    inquirer.prompt([
    {
      type: 'list',
      name: 'projectType',
      message: 'What do you build project ? ',
      choices:projects
    }]).then(function (answers) { 

      projectName=answers.projectType;

      let branchs=config.tpl[projectName].branch.split(' ');

      return inquirer.prompt([{
        type: 'list',
        name: 'branch',
        message: 'What do you from branch ? ',
        choices: branchs      
      }

    ]).then(function (answers) {
  
        branch=answers.branch;         

        var questions = [{
              type: 'input',
              name: 'projectName',
              message: 'What\'s your ProjectName name'
        }];

        return inquirer.prompt(questions); 

    }).then(function(answers){

      let myProjectName=answers.projectName; 

      let gitUrl=config.tpl[projectName].url, 
            cmdStr = `git clone -b ${branch} ${gitUrl} ${myProjectName}`;  

          console.log(chalk.white('\n Start generating...'))

          exec(cmdStr, (error, stdout, stderr) => {
            if (error) {
              console.log(error)
              process.exit()
            }
            console.log(chalk.green('\n √ Generation completed!'))
            console.log(`\n cd ${projectName} && npm install \n`)
            process.exit()
          })  
    }); 
  });

}