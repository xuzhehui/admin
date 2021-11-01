const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const recast  = require('recast')
const destDir = process.cwd()//当前工作目录

const deepClone = (target)=>{//深度拷贝
    let result
    if (typeof target === 'object') {
        if (Array.isArray(target)) {
            result = []
            for (let i in target) {
                result.push(deepClone(target[i]))
            }
        } else if(target===null) {
            result = null
        } else if(target.constructor===RegExp){
            result = target
        }else {
            result = {}
            for (let i in target) {
                result[i] = deepClone(target[i]);
            }
        }
    }else{
        result = target;
    }
    return result;
}

fs.readdir(path.join(destDir,'/src/views'),(err, files)=>{
    if(err) return 
    const questions = [
        {type:'list',name:'moduls',message:'请选择模块?',choices:files},
        {type: 'input',name:'filename',message: '请输入要生成的文件名',},
        {type: 'confirm',name:'ui',message: '是否使用ui对该页面进行操作',},
    ]
    inquirer.prompt(questions).then((message) => {
        const {moduls,filename} = message
        const path_component = `/cms/${moduls.toLowerCase()}/${filename.toLowerCase()}`
        const name = filename.toLocaleUpperCase()
        const component = `@/views/${moduls}/${filename}.vue`
        recast.run((ast,printSouse)=>{
            let routers = ast.program.body[0].declarations[0].init.elements
            const newDatas = deepClone(routers[0])
            newDatas.properties.map(element=>{
                if(element.key.name == 'path'){element.value.value = path_component}
                if(element.key.name == 'name'){element.value.value = name}
                if(element.key.name == 'component'){
                    element.value.body.argument.arguments[0].value = component
                }
            })
            ast.program.body[0].declarations[0].init.elements.push(newDatas)
            const newCode = recast.print(ast).code
            fs.writeFileSync(path.join(destDir,'/src/router/Maps/map.ts'),newCode)
        })

        const copyData = fs.readFileSync(path.join(__dirname,'template.vue'),'utf-8')
        fs.writeFile(`${destDir}/src/views/${moduls}/${filename}.vue`, copyData,(err)=>{
            if(err) {return console.log(err)}
            console.log("The file was saved!")
        });
    })
})


