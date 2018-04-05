var Dropdown = {  
    getSample: function(callback) {  
        var rows=[];
        var var1 = {
         id    : '1', 
         name  :  'sample 1',
     };
     var var2 = {
         id   : '2', 
         name  :  'sample 2',
     };
     rows.push(var1);
     rows.push(var2);
     var sampleresult= JSON.parse(JSON.stringify(rows));
     callback(null,sampleresult);
 }
};  
module.exports = Dropdown;  
