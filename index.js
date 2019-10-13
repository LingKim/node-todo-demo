const inquirer = require('inquirer');
const db = require('./db');
module.exports.add = async (title) => {

	//读取任务
	const list = await db.read();

	//添加任务
	list.push({title: title, done: false});

	//写入任务
	await db.write(list);
};

module.exports.clear = async () => {
	await db.write([]);
};

module.exports.showAll = async () => {
	//读取任务
	const list = await db.read();
	list.forEach((task, index) => {
		console.log(`${task.done ? '[X]' : '[_]'}--${index + 1}--${task.title}`);
	});

	//打印所以任务
	printTasks(list);

};

function askForAction(list,index) {
	inquirer
		.prompt([
			{
				type: 'list',
				name: 'action',
				message: '请选择操作',
				choices: [
					{name: '退出', value: 'quit'},
					{name: '已完成', value: 'markAsDone'},
					{name: '未完成', value: 'markAsUndone'},
					{name: '改标题', value: 'updateTitle'},
					{name: '删除', value: 'remove'}
				]
			}
		]).then(answers2 => {
		switch (answers2.action) {
			case 'markAsDone':
				list[index].done = true;
				db.write(list);
				break;
			case 'markAsUndone':
				list[index].done = false;
				db.write(list);
				break;
			case 'updateTitle':
				inquirer.prompt({
					type:'input',
					name:'title',
					message:'新的标题',
					default:list[index].title
				}).then(answers3 => {
					list[index].title = answers3.title;
					db.write(list);
				});
				break;
			case 'remove':
				list.splice(index,1);
				db.write(list);
				break;
		}
	})
}

function createTask(list) {
	inquirer.prompt({
		type:'input',
		name:'title',
		message:'输入任务标题',
	}).then(answers3 => {
		list.push({
			title:answers3.title,
			done:false
		});
		db.write(list);
	});
}

function printTasks(list) {
	inquirer
		.prompt([
			{
				type: 'list',
				name: 'index',
				message: '请选择你想干的事情',
				choices: [
					{name: '退出', value: '-1'},
					...list.map((task, index) => {
						return {
							name: `${task.done ? '[X]' : '[_]'}--${index + 1}--${task.title}`,
							value: index.toString()
						}
					}),
					{name: '+创建任务', value: '-2'},
				]
			}
		])
		.then(answers => {
			const index = parseInt(answers.index);
			if (index >= 0) {
				//选中任务
				askForAction(list,index);
			} else if (index === -2) {
				//创建任务
				createTask(list);
			}
		});
}
