const path = require('path');
const fs = require('fs');


function swap(d1,d2) {
    fs.readdir(path.join(__dirname, d1),(err, files) =>{
    console.log(files)
    for (let i = 0; i < files.length; i++) {

        fs.rename(path.join(__dirname, d1, files[i]),path.join(__dirname,d2 ,files[i]), err => {
            console.log(err)
        });
    }

} );

fs.readdir(path.join(__dirname, d2),(err, files) =>{
    console.log(files)
    for (let i = 0; i < files.length; i++) {

        fs.rename(path.join(__dirname, d2, files[i]),path.join(__dirname,d1 ,files[i]), err => {
            console.log(err)
        });
    }

} );

}

swap('18_00','20_00')


