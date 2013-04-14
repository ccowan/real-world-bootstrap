define(function() {
  return function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var __jade = [ {
      lineno: 1,
      filename: [ "views/index.jade" ]
    } ];
    try {
      var buf = [];
      with (locals || {}) {
        var interp;
        __jade.unshift({
          lineno: 1,
          filename: __jade[0].filename
        });
        __jade.unshift({
          lineno: 1,
          filename: __jade[0].filename
        });
        buf.push("<!DOCTYPE html>");
        __jade.shift();
        __jade.unshift({
          lineno: 3,
          filename: __jade[0].filename
        });
        buf.push("<html>");
        __jade.unshift({
          lineno: undefined,
          filename: __jade[0].filename
        });
        __jade.unshift({
          lineno: 4,
          filename: __jade[0].filename
        });
        buf.push("<head>");
        __jade.unshift({
          lineno: undefined,
          filename: __jade[0].filename
        });
        __jade.unshift({
          lineno: 4,
          filename: __jade[0].filename
        });
        buf.push('<script src="/js/lib/Modernizr.js">');
        __jade.unshift({
          lineno: undefined,
          filename: __jade[0].filename
        });
        __jade.shift();
        buf.push("</script>");
        __jade.shift();
        __jade.unshift({
          lineno: 5,
          filename: __jade[0].filename
        });
        buf.push("<title>");
        var __val__ = title;
        buf.push(escape(null == __val__ ? "" : __val__));
        __jade.unshift({
          lineno: undefined,
          filename: __jade[0].filename
        });
        __jade.shift();
        buf.push("</title>");
        __jade.shift();
        __jade.unshift({
          lineno: 6,
          filename: __jade[0].filename
        });
        buf.push('<link rel="stylesheet" href="/css/bootstrap.min.css">');
        __jade.shift();
        __jade.unshift({
          lineno: 7,
          filename: __jade[0].filename
        });
        buf.push('<link rel="stylesheet" href="/css/bootstrap-responsive.min.css">');
        __jade.shift();
        __jade.unshift({
          lineno: 8,
          filename: __jade[0].filename
        });
        buf.push('<link rel="stylesheet" href="/css/font-awesome.min.css">');
        __jade.shift();
        __jade.unshift({
          lineno: 9,
          filename: __jade[0].filename
        });
        buf.push('<link rel="stylesheet" href="/css/custom-font.css">');
        __jade.shift();
        __jade.unshift({
          lineno: 10,
          filename: __jade[0].filename
        });
        buf.push('<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,800,700,600,300">');
        __jade.shift();
        __jade.unshift({
          lineno: 11,
          filename: __jade[0].filename
        });
        buf.push('<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Ceviche+One">');
        __jade.shift();
        __jade.unshift({
          lineno: 12,
          filename: __jade[0].filename
        });
        buf.push('<link rel="stylesheet" href="/css/style.css">');
        __jade.shift();
        __jade.shift();
        buf.push("</head>");
        __jade.shift();
        __jade.unshift({
          lineno: 14,
          filename: __jade[0].filename
        });
        buf.push("<body>");
        __jade.unshift({
          lineno: undefined,
          filename: __jade[0].filename
        });
        __jade.unshift({
          lineno: 14,
          filename: __jade[0].filename
        });
        buf.push('<div class="container-fluid">');
        __jade.unshift({
          lineno: undefined,
          filename: __jade[0].filename
        });
        __jade.unshift({
          lineno: 15,
          filename: __jade[0].filename
        });
        buf.push('<div class="row-fluid">');
        __jade.unshift({
          lineno: undefined,
          filename: __jade[0].filename
        });
        __jade.unshift({
          lineno: 16,
          filename: __jade[0].filename
        });
        buf.push('<div class="span4">');
        __jade.unshift({
          lineno: undefined,
          filename: __jade[0].filename
        });
        __jade.shift();
        buf.push("</div>");
        __jade.shift();
        __jade.unshift({
          lineno: 17,
          filename: __jade[0].filename
        });
        buf.push('<div class="span4 main">');
        __jade.unshift({
          lineno: undefined,
          filename: __jade[0].filename
        });
        __jade.unshift({
          lineno: 18,
          filename: __jade[0].filename
        });
        buf.push('<h1 class="logo">');
        __jade.unshift({
          lineno: undefined,
          filename: __jade[0].filename
        });
        __jade.unshift({
          lineno: 19,
          filename: __jade[0].filename
        });
        buf.push('<img src="/img/yak.png">');
        __jade.shift();
        __jade.unshift({
          lineno: 20,
          filename: __jade[0].filename
        });
        buf.push('<span class="headline">');
        __jade.unshift({
          lineno: undefined,
          filename: __jade[0].filename
        });
        __jade.unshift({
          lineno: 20,
          filename: __jade[0].filename
        });
        buf.push("&nbsp;Yakity Yak Yak");
        __jade.shift();
        __jade.shift();
        buf.push("</span>");
        __jade.shift();
        __jade.shift();
        buf.push("</h1>");
        __jade.shift();
        __jade.unshift({
          lineno: 21,
          filename: __jade[0].filename
        });
        buf.push('<div class="row-fluid content">');
        __jade.unshift({
          lineno: undefined,
          filename: __jade[0].filename
        });
        __jade.unshift({
          lineno: undefined,
          filename: __jade[0].filename
        });
        __jade.unshift({
          lineno: undefined,
          filename: __jade[0].filename
        });
        buf.push("");
        __jade.shift();
        __jade.shift();
        __jade.shift();
        buf.push("</div>");
        __jade.shift();
        __jade.shift();
        buf.push("</div>");
        __jade.shift();
        __jade.unshift({
          lineno: 23,
          filename: __jade[0].filename
        });
        buf.push('<div class="span4">');
        __jade.unshift({
          lineno: undefined,
          filename: __jade[0].filename
        });
        __jade.shift();
        buf.push("</div>");
        __jade.shift();
        __jade.shift();
        buf.push("</div>");
        __jade.shift();
        __jade.shift();
        buf.push("</div>");
        __jade.shift();
        __jade.unshift({
          lineno: 24,
          filename: __jade[0].filename
        });
        buf.push('<script src="/js/lib/require.js" data-main="/js/main">');
        __jade.unshift({
          lineno: undefined,
          filename: __jade[0].filename
        });
        __jade.shift();
        buf.push("</script>");
        __jade.shift();
        __jade.shift();
        buf.push("</body>");
        __jade.shift();
        __jade.shift();
        buf.push("</html>");
        __jade.shift();
        __jade.shift();
      }
      return buf.join("");
    } catch (err) {
      rethrow(err, __jade[0].filename, __jade[0].lineno);
    }
  };
});