var ghIssueUrl = /(?:https?:)?\/\/(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)\/issues\/(\d+)$/;

$.fn.extend({
  trackIssue: function(){
    var el = this;

    var deferred = $.Deferred();
    deferred.done(function(state, id){
      if (state === 'open') {
        $(el).addClass('tissue-open').attr('title', id + ': Open');
      }
      else if (state === 'closed') {
        $(el).addClass('tissue-closed').attr('title', id + ': Closed');
      }
    });
    deferred.fail(function(err, id){
      if (err === 'Not Found'){
        $(el).addClass('tissue-err').attr('title', id + ': ' + err);
      }
      else {
        console.log("Unhandled error:", err, id);
      }
    });

    var parts = ghIssueUrl.exec($(el).attr('href'));
    if (parts && parts.length == 4) {
      var user = parts[1];
      var project = parts[2];
      var issueNum = parts[3];
      var issueId = user + '/' + project + '#' + issueNum;
      $(el).addClass('tissue').attr('title', 'Checking ' + issueId + '...');
      var ajax = $.ajax({
        url: 'https://api.github.com/repos/' + user + '/' + project + '/issues/' + issueNum,
        error: function(xhr, textStatus, err){
          deferred.reject(err, issueId);
        },
        success: function(data, textStatus, xhr){
          deferred.resolve(data.state, issueId);
        }
      });
    }
    else {
      deferred.resolve('SKIP');
    }
    return deferred;
  }
});

$(function(){
  $('[rel~="issue"]').each(function(){
    $(this).trackIssue();
  });
})
