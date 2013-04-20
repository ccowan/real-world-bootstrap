define(['runtime'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="span5"><div class="row-fluid"><div class="span12"><h1>Yakity Is a Free-dumb<br/>Social Network</h1><p>It\'s your real-time feed, a home for meaningless conversation, where you often loose control. It\'s a place to yak it up with your friends and complete strangers about your live and express your opionions about all the worthless crap that is your life.</p><p>In all reality though, this is just a demo site for my "Real World Backbone.js" presentation. It contains examples of how I would solve real world problems and impliment common pages. It might be crap or it might just be a stroke of genius... that\'s for you to decide.</p><p> \nAll the code is available on <a href="https://github.com/ccowan/real-world-backbone">GitHub.</a></p></div></div></div><div class="span5"><div id="signin" class="row-fluid"></div><div id="signup" class="row-fluid"></div></div>');
}
return buf.join("");
};
});