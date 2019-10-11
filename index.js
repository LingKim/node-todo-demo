const program = require('commander');

program
    .option('-a, --aaa', '测试行不行');
program
    .command('add')
    .description('添加一个任务')
    .action((...args) => {
        const works = args.slice(0,-1);
        console.log(works);
    });
program
    .command('clear')
    .description('删除一个任务')
    .action((...args) => {
        const works = args.slice(0,-1);
        console.log(works);
    });

program.parse(process.argv);
