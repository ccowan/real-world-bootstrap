define(['runtime'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="span12"><h4>Already Have an Account?</h4><form><div class="control-group"><input type="text" name="username" placeholder="Username" class="span12"/></div><div class="control-group controls-row"><input type="password" name="password" placeholder="Password" class="span10"/><button class="span2 btn btn-warning">Signin </button></div></form></div>');
}
return buf.join("");
};
});