const _ = require('lodash');
const fs = require('fs');
const path = require('path');

//将dir下的文件和文件夹映射成对象
const mapDir = dir => {
    const tree = {};
    const [dirs, files] = _(fs.readdirSync(dir)).partition(item => {
        return fs.statSync(path.join(dir, item)).isDirectory()
    })
    dirs.forEach(item => {
        tree[item] = mapDir(path.join(dir, item));
    });
    files.forEach(item => {
        if(path.extname(item) === '.js') {
            tree[path.basename(item, '.js')] = require(path.join(dir, item));
        }
    });
    return tree;
};

module.exports = mapDir(__dirname);