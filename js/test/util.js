function makeLink(spec){
  var text = spec.text || 'Foo';
  var attrs = spec.attrs || {};
  var link = $('<a>' + text + '</a>');
  Object.keys(attrs).forEach(function(k, i, arr){
    $(link).attr(k, attrs[k]);
  });
  return link;
}

function tissueTest(spec){
  asyncTest("Handles " + spec.url, function() {
    var link = makeLink({attrs: {
       href: spec.url
    }});
    var issue = $(link).appendTo($('#qunit-fixture'));
    $(issue).trackIssue().always(function(){
      /* once the ajax call is done... */
      if (spec.expectClass) {
        spec.expectClass.forEach(function(val, i, arr){
          ok($(issue).hasClass(val), 'has class "' + val + '"');
        });
      }
      if (spec.expectSkip) {
        ['tissue', 'tissue-open', 'tissue-closed', 'tissue-err'].forEach(function(val, i, arr){
          ok(!$(issue).hasClass(val), 'no class "' + val + '"');
        });
      }
      equal($(issue).attr('title'), spec.expectTitle, 'Titled "' + spec.expectTitle + '"');
      start();
    });
    /* while the ajax is going... (not sure about the timing here) */
    if (spec.expectSkip) {
      ok(!$(issue).hasClass('tissue'), 'not marked as tissue');
    }
    else {
      ok($(issue).hasClass('tissue'), 'marked as tissue while waiting');
      equal($(issue).attr('title'), spec.expectWaitTitle, 'has waiting title');
    }
  });
}
