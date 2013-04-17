define(['runtime'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="avatar pull-left"><img');
buf.push(attrs({ 'src':(avatar) }, {"src":true}));
buf.push('/></div><div class="name">' + escape((interp = name) == null ? '' : interp) + ' <br/><a href="/signout">Signout</a></div>');
}
return buf.join("");
};
});