for (var key in MathQuill) (function(key, val) {
  if (typeof val === 'function') {
    preInterVerMathQuill[key] = function() {
      insistOnInterVer();
      return val.apply(this, arguments);
    };
    preInterVerMathQuill[key].prototype = val.prototype;
  }
  else preInterVerMathQuill[key] = val;
}(key, MathQuill[key]));

}());
