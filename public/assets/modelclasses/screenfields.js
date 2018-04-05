


function Screenfield() { 
   // private member
var _fld_name;
var _fld_tooltip;
var _fld_desc;
var _fld_dt;
var _fld_it;
var _fld_val;
var _fld_minl;
var _fld_maxl;


  Object.defineProperty(this,"fldname",{
    get: function() { return _fld_name; },
    set: function(value) { _fld_name = value;},
     enumerable: true
  });

Object.defineProperty(this,"fldtooltip",{
    get: function() { return _fld_tooltip; },
    set: function(value) { _fld_tooltip = value;},
     enumerable: true
  });

Object.defineProperty(this,"flddesc",{
    get: function() { return _fld_desc; },
    set: function(value) { _fld_desc = value;},
     enumerable: true
  });
Object.defineProperty(this,"flddatatype",{
    get: function() { return _fld_dt; },
    set: function(value) { _fld_dt = value;},
     enumerable: true
  });

Object.defineProperty(this,"fldinputtype",{
    get: function() { return _fld_it; },
    set: function(value) { _fld_it = value;},
     enumerable: true
  });


  Object.defineProperty(this,"fldvalidation",{
    get: function() { return _fld_val; },
    set: function(value) { _fld_val = value;},
     enumerable: true
  });


  Object.defineProperty(this,"fldminlength",{
    get: function() { return _fld_minl; },
    set: function(value) { _fld_minl = value;},
     enumerable: true
  });


  Object.defineProperty(this,"fldmaxlength",{
    get: function() { return _fld_maxl; },
    set: function(value) { _fld_maxl = value;},
     enumerable: true
  });
}
