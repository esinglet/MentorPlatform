var cron = require("node-cron");

// http://www.nncron.ru/help/EN/working/cron-format.htm
cron.schedule("0 0 * * *", function(){
    var date = new Date()
});