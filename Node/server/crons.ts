
let parseArgument = (config: any)=>{
    let index = -1;
    for(let option of process.argv){
        index++;
        if(index<2) continue;
        //console.log('options', option);

        switch (option) {
            case '--install:true': {
                require("./boot/configuration/install")(config);
                break;
            }
            default: break;
        }

    }
}

let parseParam = (config: any, json: any)=>{
    Object.keys(json).forEach(function(key) {
        var option = json[key];
        switch (key) {
            case '--install': {
                if (option == true) {
                    require("./boot/configuration/install")(config);
                }
                break;
            }
            default: break;
        }
    });
}

module.exports = (config: any, array: any)=>{
    parseParam(config, array)
}
