const fs=require('node:fs'),path=require('node:path');
fs.mkdirSync('dist',{recursive:true});
for(const file of ['index.html','styles.css','script.js'])fs.copyFileSync(file,path.join('dist',file));
for(const directory of ['ASSETS','fonts'])fs.cpSync(directory,path.join('dist',directory),{recursive:true});
const html=fs.readFileSync('index.html','utf8');for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){const p=decodeURIComponent(match[1]);if(!/^(https?:|tel:)/.test(p)&&!fs.existsSync(p))throw new Error(`Missing asset: ${p}`);}
console.log('Static site built; all local HTML references resolve.');
