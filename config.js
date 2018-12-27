const fs=require('fs'),
path=require('path'),
entryObj={},
distPath=path.join(__dirname,'/dist/'),
origPath=path.join(__dirname,'/js');
/** 
*读取目录
**/
function readDir(path){
    return new Promise((resolve,reject)=>{
        fs.readdir(path,(err,files)=>{
           err&&(reject(err));
           resolve(files);
        })
    })
   
}
/**
* 获取stat
**/
function getStat(path){
    return new Promise((resolve,reject)=>{
        fs.stat(path,(err,stats)=>{
            err&&(reject(err));
            resolve(stats);
        })
    })
   
}
/** 
 * 创建目录
*/
function createDirec(path){
    return new Promise((resolve,reject)=>{
        fs.exists(path,function(exit){
            if(!exit){
                fs.mkdir(path, function(err){
                    err&&(reject(err));
                    resolve();
                });
            }else{
                resolve();
            }
        })
    })
    
}

/** 
* 递归获取所有文件
* 
**/
async function getExport(filePath,dire){
    let files=await readDir(filePath);
    for(let i=0;i<files.length;i++){
        let pattern=path.join(filePath,files[i])
        let stat=await getStat(pattern);
        if(dire){
            var tempPath=path.join(distPath,dire);
           // joinPath=path.join(origPath,dire);
        }else{
            var tempPath=distPath;
            //joinPath=origPath;
        }
        if(stat.isDirectory()){
           // await createDirec(path.join(tempPath,files[i]));
            await getExport(path.join(filePath,files[i]),files[i]);//
        }else{
            entryObj[files[i].slice(0,files[i].lastIndexOf('.'))]=path.join(filePath,files[i]);
        }
    }
    return entryObj;
}
module.exports=getExport;
