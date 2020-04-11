// //let crypto = require('crypto');
// // const redis = require('redis');
// const clientRedis = redis.createClient();
// /**
//  * Структура представлена в бд в виде:
//  * (hashes) sites:<hash>: {
//  *                            token Of client: <token>
//  *                            lastTime: <time>
//  *                            data: <JSON>
//  *                            time: <time>
//  *                         }
//  * (set)     sites:set: <hash>
//  */
//
// var SessionModel = function() {
//     this.client = clientRedis;
//     this.isCreate = false;
//
//     return this;
// };
//
// // Функция фабрика
// SessionModel.prototype.create = (token: any, data: any, time: any)=>{
//     /* DATA: <JSON> */
//     // @ts-ignore
//     var site = new SessionModel();
//     site.token = token;
//     site.data = data;
//     site.time = time || new Date().getTime();
//     site.isCreate = true;
//     return site;
// };
//
// SessionModel.prototype.__defineGetter__('hash', function () {
//     return '';//this.getHash(this.url);
// });
//
// // Функция возвращает md5 хеш
// SessionModel.prototype.getHash = function (url: any) {
//     //return crypto.createHash('md5').update((url || this.url)).digest('hex');;
// };
//
// // Префиксы
// SessionModel.prototype._prefix_ = 'sites:';
//
// // Возвращает имя ключа для Hashes
// SessionModel.prototype.pHashes = function (url: any) {
//     //return SessionModel.prototype._prefix_ + this.getHash(url) + ':';
//     return SessionModel.prototype._prefix_;
// };
//
// // Возвращает имя поля для URL
// SessionModel.prototype.kUrl = function () {
//     return 'url:';
// };
//
// SessionModel.prototype.kData = function () {
//     return 'data:';
// };
//
// // Возвращает имя поля для времени последнего входа
// SessionModel.prototype.kLastTime = function () {
//     return 'lastTime:';
// };
//
// // Возвращает имя ключа для Set
// SessionModel.prototype.pSet = function () {
//     return SessionModel.prototype._prefix_ + 'set:';
// };
//
// //SessionModel.save();
// SessionModel.prototype.save = function (callback: any) {
//     // проверяем была ли создана модель через .create()
//     if (this.isCreate) {
//         this._save.call(this, callback);
//     } else {
//         if (callback) callback.call(this, new Error('Модель должна быть создана перед сохранением'), null, this);
//     };
// };
//
// // Основная функция выполняющая сохранение
// SessionModel.prototype._save = function (callback: any) {
//     // Сохраняем все в один запрос
//     this.client.multi([
//         ['hmset', this.pHashes(), this.kData(), this.data, this.kLastTime(), this.time],
//         ['sadd', this.pSet(), this.hash]
//     ]).exec(function (err: any, repl: any) {
//         if (err) {
//             if (callback) callback.call(this, err, null, this);
//         } else {
//             if (callback) callback.call(this, null, repl, this);
//         };
//     }.bind(this));
// };
// ////
//
// // SiteModel.remove()
// SessionModel.prototype.remove = function (url:any, callback: any) {
//     //  Если аргумент 1, то это callback
//     if (arguments.length == 1) {
//         var callback = arguments[0];
//         url = undefined;
//     };
//
//     this.client.multi([
//         ['del', this.pHashes(url)],
//         ['srem', this.pSet(), this.hash]
//     ]).exec(function (err: any, repl: any) {
//         if (err) {
//             if (callback) callback.call(this, err, null, this);
//         } else {
//             if (callback) callback.call(this, null, repl, this);
//         };
//     }.bind(this));
// };
// ////
//
//
// module.exports.Session = SessionModel;
