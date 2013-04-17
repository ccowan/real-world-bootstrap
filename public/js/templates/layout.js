define(['runtime'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html><head><script src="/js/lib/Modernizr.js"></script><title>');
var __val__ = title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link rel="stylesheet" href="/css/bootstrap.min.css"><link rel="stylesheet" href="/css/bootstrap-responsive.min.css"><link rel="stylesheet" href="/css/font-awesome.min.css"><link rel="stylesheet" href="/css/custom-font.css"><link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,800,700,600,300"><link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Ceviche+One"><link rel="stylesheet" href="/css/style.css"></head><body><div class="navigation"><div class="container"><div class="row-fluid"><div id="dashboard" class="pull-right"></div><div class="span6"><h1 class="logo"><img src="/img/yak.png"><span class="headline">&nbsp;Yakity Yak Yak</span></h1></div></div></div></div><div class="container"><div id="content"></div></div><script src="/js/lib/require.js" data-main="/js/main"></script></body></html>');
}
return buf.join("");
};
});