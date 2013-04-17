define(['runtime'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<h3>Explore</h3><ul><li class="active"><i class="icon-chevron-right pull-right"></i><a href="/api/v1/posts/mine">My Feed </a></li><li><i class="icon-chevron-right pull-right"></i><a href="/api/v1/posts/mentions">@Mentions</a></li><li><i class="icon-chevron-right pull-right"></i><a href="/api/v1/posts">Kitchen Sink</a></li></ul>');
}
return buf.join("");
};
});