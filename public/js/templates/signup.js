define(['runtime'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="span12"><form><h4>New User? Get Started Now</h4><div class="controls"><input type="text" name="name" placeholder="Full Name" class="span12"/></div><div class="controls"><input type="text" name="username" placeholder="Username" class="span12"/></div><div class="controls"><input type="text" name="email" placeholder="Email Address" class="span12"/></div><div class="controls"><input type="text" name="password" placeholder="Password" class="span12"/></div><div class="controls"><button class="pull-right btn btn-warning">Sign Up Now</button></div><div class="clearfix"></div></form></div>');
}
return buf.join("");
};
});