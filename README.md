![Zp Logo](./logo.jpg)

# ZP
网上找代码 自己实现的第一个脚手架

# Installation
```
npm install zp-cli -g
```
or
```
git clone https://github.com/zhongpingWang/zp.git

cd zp && npm install

npm link
```

# Usage
Open your terminal and type `zp` or `zp -h` , you'll see the help infomation below:
```
  Usage: zp <command>


  Commands:

    add|a      Add a new template
    list|l     List all the templates
    init|i     Generate a new project
    delete|d   Delete a template

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

# Commands
### add | a
This command would help you to add a new template to the `templates.json`, which will be used by zp to generate projects.
```
$ zp add
```
```
 /*  your template's name */
Template name: my-tpl

 /* your template's git https link, note that it ends with .git */
Git https link:  https://gitxxx/somebody/my-tpl.git 

 /* your template's branch */
Branch: master 
```
Once confirm you'll see the message like below:
```
The last template list is:

{ tpl:
   { 'my-tpl-name':
      { url: 'https://github.com/zhongpingWang/ReactTree',
        branch: 'master' } } }
```
Now you've added a new template to zp successfully.

### list | l
It shows you the templates list.
```
$ zp list

{ tpl:
   { 'my-tpl-name':
      { url: 'https://github.com/zhongpingWang/ReactTree',
        branch: 'master' } } }
```

### init | i
After adding new templates, you could use this command to generate your own project by choosing template.
```
$ zp init

/* enter a template name which was added by yourself */
Template name: my-tpl-name

/* your project name */
Project name: my-new-project
```
After enter correct template name and confirm, you'll see the message below:
```
Start generating...

 √ Generation completed!

 cd my-new-project && npm install
```
It's easy, right?

### delete | d
To delete a template, you could use this command:
```
$ zp delete
```
and type the template name you want to delete:
```
Template name: my-tpl-name
```
if the name exist, you will see:
```
Template deleted!
The last template list is:

{ tpl:
   { 'my-tpl-name': undefined } }
```
once a template is `undefined`, it means you've deleted it successfully.

# Template
The most important part of zp is `template`. All templates' infomation were list in the `templates.json`.
A template means a project sample, which has a simple or complex file structure.

You can create your own templates repository, and push your templates in different branches. All you need to do then is to add the templates into zp's `templates.json`.

 










