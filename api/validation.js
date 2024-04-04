const getTimestamp = () => {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    
    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }   
    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }
    if(second.toString().length == 1) {
         second = '0'+second;
    }   
    var dateTime = day+"/"+month+"/"+year+" "+hour+":"+minute+":"+second 
     return dateTime;
}

function existsOrError (value, msg) {
     if (!value) throw msg
     if(Array.isArray(value) && value.length === 0) throw msg
     if(typeof value === 'string' && !value.trim()) throw msg
}

function notExistsOrError(value, msg) {
     try {
          existsOrError(value,msg)
     } catch(msg) {
          return
     } throw msg 
}

function equalsOrError(valueA, valueB, msg) {
     if (valueA !== valueB) throw msg
}

module.exports = {existsOrError, notExistsOrError, equalsOrError, getTimestamp}