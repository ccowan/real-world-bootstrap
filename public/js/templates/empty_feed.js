define(['runtime'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="span12"><div class="body empty"><h2 class="muted">No Post! Wha Wha Whaaaa! </h2></div></div>');
}
return buf.join("");
};
});