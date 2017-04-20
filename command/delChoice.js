'use strict'
 
 
const config = require('../templates')
const fs = require('fs')
var inquirer = require('inquirer');


module.exports = () => {
     //是否存在
    if (config.tpl.length<=0) {
      console.log(chalk.red('\n × No Template to Delete!'))
      process.exit()
    }

    let projects=Object.keys(config.tpl); 

    projects.push(new inquirer.Separator());
    projects.push( {
        name: '我是一只小小草',
        disabled: 'Unavailable at this time'
    }); 

    inquirer.prompt([
    {
      type: 'checkbox',
      name: 'projectType',
      message: 'choise project to delete ? ',
      choices:projects
    }]).then(function(answers){

        let projects=answers.projectType;

        if (projects.length<=0) {
          console.log(chalk.red('选择了无效的项目!'))
          process.exit()
        }

        projects.forEach(function(item){
            if (config.tpl[item]) {
              config.tpl[item] = undefined
            } 
        }); 


        fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
          if (err) console.log(err)
          console.log('Template deleted!')
          console.log('The last template list is: \n')
          console.log(config)
          console.log('\n')
          process.exit()
        }) 

    })
}