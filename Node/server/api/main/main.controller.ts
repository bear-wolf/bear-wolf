export {}
/*
* route: '/'
*/
let main = (req: any, res: any, next: any) =>{
    res
        .status(200)
        .send("Site is working!")
}

let settings = (req: any, res: any, next: any) =>{
    res
        .status(200)
        .send("getSettings!")
}


module.exports = {
    main,
    settings
}
