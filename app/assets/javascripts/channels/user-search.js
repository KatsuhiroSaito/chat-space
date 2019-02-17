$(function(){
  var user_search_result = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    user_search_result.append(html);
  }

  function appendNoUser(message) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ message }</p>
                </div>`
    user_search_result.append(html);
  }

  function emptySearchResult() {
    user_search_result.empty();
  }

  function addUserToMember(user_name, user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${ user_id }' class='chat-group-user-input'>
                  <p class='chat-group-user__name'>${ user_name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`

    $("#chat-group-users").append(html);
  }

  function searchUsers () {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      emptySearchResult()
      var alreadyAddedMemberIds = [];
      alreadyAddedMemberIds = alreadyAddedUsers (alreadyAddedMemberIds);

      if (users.length !== 0) {
        users.forEach(function(user){
          if ($.inArray(user.id.toString(), alreadyAddedMemberIds) == -1) {
            appendUser(user);
          }
        });
      }
      else {
        appendNoUser("該当するユーザーはいません");
      }
      if (input == "") {
        emptySearchResult()
      }
    })

    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  }

  function alreadyAddedUsers (alreadyAddedMemberIds){
    var added_users_num = $(".chat-group-user-input").length;
    for (var number = 0; number < added_users_num; number += 1) {
      alreadyAddedMemberIds.push($(".chat-group-user-input").eq(number).attr("value"));
    }
    return alreadyAddedMemberIds;
  }

  $("#user-search-field").on("keyup", function() {
    searchUsers ();
  });

  $(document).on("click", ".chat-group-user__btn--add", function(){
    $(this).parent().remove();
    var user_name = $(this).attr("data-user-name");
    var user_id = $(this).attr("data-user-id");
    addUserToMember(user_name, user_id);
  });

  $(document).on("click", ".chat-group-user__btn--remove", function(){
    $(this).parent().remove();
    searchUsers ();
  });
});
