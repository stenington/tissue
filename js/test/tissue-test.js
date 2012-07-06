
$(document).ready(function(){

  test("rel=issue links run automatically", function(){
    $('#autorun .should').each(function(){
      ok($(this).hasClass('tissue'), 'marked');
    });
    $('#autorun .not').each(function(){
      ok(!$(this).hasClass('tissue'), 'not marked');
    });
  });

  tissueTest({
    url: "http://github.com/stenington/tissue/issues/1",
    expectClass: ['tissue', 'tissue-open'],
    expectTitle: "stenington/tissue#1: Open",
    expectWaitTitle: "Checking stenington/tissue#1..."
  });
  
  tissueTest({
    url: "http://github.com/stenington/tissue/issues/2",
    expectClass: ['tissue', 'tissue-closed'],
    expectTitle: "stenington/tissue#2: Closed",
    expectWaitTitle: "Checking stenington/tissue#2..."
  });

 tissueTest({
    url: "https://github.com/stenington/tissue/issues/2",
    expectClass: ['tissue', 'tissue-closed'],
    expectTitle: "stenington/tissue#2: Closed",
    expectWaitTitle: "Checking stenington/tissue#2..."
  });

   tissueTest({
    url: "//github.com/stenington/tissue/issues/2",
    expectClass: ['tissue', 'tissue-closed'],
    expectTitle: "stenington/tissue#2: Closed",
    expectWaitTitle: "Checking stenington/tissue#2..."
  });

  tissueTest({
    url: "http://not-even-github.com/foo/bar/issues/1",
    expectSkip: true,
    expectTitle: undefined
  });

  tissueTest({
    url: "http://github.com/stenington/not-a-project/issues/1",
    expectClass: ['tissue', 'tissue-err'],
    expectTitle: "stenington/not-a-project#1: Not Found",
    expectWaitTitle: "Checking stenington/not-a-project#1..."
  });

  tissueTest({
    url: "http://github.com/stenington/tissue/issues/99999999",
    expectClass: ['tissue', 'tissue-err'],
    expectTitle: "stenington/tissue#99999999: Not Found",
    expectWaitTitle: "Checking stenington/tissue#99999999..."
  });

});
