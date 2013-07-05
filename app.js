/**
 * @author XU Kai(xukai.ken@gmail.com) botobe.net;
 * @version 0.0.1
 *
 * Exam:
 *    Sync.parallel([
 *       function(callback){
 *          callback({}, 0);
 *       },
 *       function(callback){
 *          callback({}, 1);
 *       },
 *       function(callback){
 *          callback({}, 2);
 *       }],
 *
 *       // 最终触发的回调函数
 *       function(error, results) {
 *
 *       }
 *    );
 *
 */

(function() {

   var Sync = {};

   Sync.parallel = function(tasks, callback) {
      if (tasks.constructor === Array) {

         if (tasks.length) {
            var tasksLength = tasks.length;
            var firstTask = tasks.shift();

            var errorStack = [], resultStack = [];

            var ProcessFeedBack = function(errors, results) {

            }
            var signal = function(error, result) {
               if (tasks.length) {
                  var nextTask = tasks.shift();
                  nextTask(signal);
               } else {
                  callback(errorStack, resultStack);
               }
            };
            firstTask(signal);
         }

      } else {

      }
   };

   Sync.series = function(tasks, callback) {
      if (tasks.constructor === Array) {

      } else {

      }
   };

   this.Sync = Sync;
})();

// 实测代码区域
Sync.parallel([
   function(callback) {
      callback({}, 0);
   },
   function(callback) {
      callback({}, 1);
   },
   function(callback) {
      callback({}, 2);
   }],

   // 最终触发的回调函数
   function(error, results) {
      console.log(error);
      console.log(results);
   }
);
