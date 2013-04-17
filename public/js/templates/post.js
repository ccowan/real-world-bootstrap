define(['runtime'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="span1"><div class="avatar"><img');
buf.push(attrs({ 'src':(user.avatar) }, {"src":true}));
buf.push('/></div></div><div class="span11"><div class="row-fluid"><div class="span12"><div class="name">' + escape((interp = user.name) == null ? '' : interp) + ' (' + escape((interp = user.username) == null ? '' : interp) + ')</div><div class="body">');
var __val__ = body
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div><div class="date">' + escape((interp = moment(date).calendar()) == null ? '' : interp) + '</div></div></div></div>');
}
return buf.join("");
};
});