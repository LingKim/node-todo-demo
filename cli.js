const program = require('commander');
const inquirer = require('inquirer');
const api = require('./index');

program
    .option('-a, --aaa', '测试行不行');
program
    .command('add')
    .description('添加一个任务')
    .action((...args) => {
        const works = args.slice(0,-1).join(' ');
        api.add(works).then(() => console.log('添加成功'),() => console.log('添加失败'));
        console.log(works);
    });
program
    .command('clear')
    .description('删除一个任务')
    .action((...args) => {
        api.clear().then(() => console.log('清除成功'),() => console.log('清除失败'));
    });

program.parse(process.argv);

if(process.argv.length === 2) {
   void api.showAll();
}
