$(function(){
  var search_list = $("#search_list");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザー名</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</a>
                </div>`
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
    })

    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
});
