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

   Sync.series = function(tasks, callback) {
      
      // 判断不同的参数结构，执行不同的方法体。
      if (tasks.constructor === Array) {
         var tasksLength = tasks.length;
         if (tasksLength) {
            var firstTask = tasks.shift();

            var resultStack = [], error = null;
            var procedure = function(taskError, result) {
               
               // 把执行结果和错误压入堆栈。
               resultStack.push(result);
               error = taskError || error;
               if (tasks.length) {
                  var nextTask = tasks.shift();
                  nextTask(procedure);
               } else {
                  callback(error, resultStack);
               }
            };
            firstTask(procedure);
         } else {
            callback();
         }
      } else {
         ;
      }
   };

   Sync.parallel = function(tasks, callback) {
      if (tasks.constructor === Array) {
         var tasksLength = tasks.length;
         if (tasksLength) {
            
            var resultStack = [], taskCounter = 0, error = null;
            var procedure = function(taskError, result) {
               
               // 任务执行计数器加一。
               taskCounter++;
               
               // 压入执行结果和执行过程中遇到的错误。
               resultStack.push(result);
               error = taskError || error;
               
               // 最后执行成功触发的回调。             
               if (taskCounter == tasksLength)
                  callback(error, resultStack);
            };
            while(tasks.length > 0) {
               var currentTask = tasks.shift();
               currentTask(procedure);
            }
         } else {
            callback();
         }
      } else {
         ;
      }
   };

   this.Sync = Sync;
})();

// 实测代码区域
/* Sync.series([
   function(callback) {
      callback(null, 0);
   },
   function(callback) {
      callback(null, 1);
   },
   function(callback) {
      callback(null, 2);
   }],
   
   // 最终触发的回调函数
   function(error, results) {
      error && console.log(error.message);
      console.log(results);
   }
); */

Sync.parallel([
      function(callback) {
         callback(null, 1);
      },
      function(callback) {
         callback(null, 2);
      },
      function(callback) {
         callback(null, 3);
      }
   ],
   
   function(error, results) {
      error && console.log(error.message);
      console.log(results);
   }
)
