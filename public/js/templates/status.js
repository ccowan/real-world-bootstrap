define(['runtime'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row-fluid"><div class="span1"><div class="avatar"><img');
buf.push(attrs({ 'src':(avatar) }, {"src":true}));
buf.push('/></div></div><div class="span11"><form><div><textarea name="post" class="span12"></textarea></div><div><button class="btn">Post </button></div></form></div></div>');
}
return buf.join("");
};
});