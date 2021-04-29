const fs = require('fs');
const path = require('path');
const tinify = require('tinify');
tinify.key = 'Zkz0PG7lF2hbFKKVQmhLr6sywmZfMbW4';


const saveImg = (name, file) => {
  fs.writeFileSync(path.resolve(__dirname, `./tiny-imgs/${name}`), file);
}
const readImg = (path, name) => {
  fs.readFile(path, (err, buf) => {
    if (err) {
      console.log('readImg error', path, err);
    } else {
      tinify.fromBuffer(buf).toBuffer((err, res) => {
        if (err) {
          console.log(2, err);
        } else {
          console.log(`上传进度[${++now}/${count}]，文件:${name}`);
          saveImg(name, res);
        }
      });
    }
  });
}

let count = 0;
let now = 0;
const upload = () => {
  const dirPath = path.resolve(__dirname, './imgs');
  const fileList = fs.readdirSync(dirPath);
  count = fileList.length;
  console.log(`共${count}个文件, 开始上传`);
  fileList.forEach((img) => {
    const filePath = dirPath + '/' + img;
    readImg(filePath, img);
  });
}

// readImg(path.resolve(__dirname, './imgs/dw-cwg-normal@2x.png'));
// getFileName(path.resolve(__dirname, './imgs/dw-cwg-normal@2x.png'));
upload();