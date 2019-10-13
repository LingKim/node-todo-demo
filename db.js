const homeDir = require('os').homedir();
const path = require('path');
const dbPath = path.join(homeDir, './todo');
const fs = require('fs');

const db = {
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, {flag: 'a+'}, (err, data) => {
                if (err) {
                    return reject(err);
                }
                let list;
                try {
                    list = JSON.parse(data.toString());
                } catch (e) {
                    list = [];
                }
                resolve(list);
            });
        });
    },
    write(list, path = dbPath) {
        const string = JSON.stringify(list);
        return new Promise((resolve, reject) => {
            fs.writeFile(path, string, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(err);
            })
        });
    }
};

module.exports = db;
