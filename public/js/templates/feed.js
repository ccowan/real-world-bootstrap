define(['runtime'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row-fluid"><div class="span12"><h3>My Feed </h3></div></div><div class="row-fluid"><div id="posts" class="span12"></div></div>');
}
return buf.join("");
};
});