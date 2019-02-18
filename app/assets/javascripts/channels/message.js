$(function(){
  function buildNewMessageHTML(message){

    var img = "";
    if (message.image["url"] !== null) {
        img = `<img class="message__lower-image" src="${message.image.url}">`;
    }
    var html = `<div class="message" data-id="${message.id}">
                  <div class="message__upper">
                    <div class="message__upper-name">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-time">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message__lower">
                    <div class="message__lower-body">
                      ${message.body}
                    </div>
                    ${ img }
                  </div>
                </div>`
    return html;
  };

  $(function(){
    setInterval(auto_reload, 5000);
  });

  function auto_reload() {
    var latest_message_id = $('.message:last').attr('data-id');

    $.ajax({
      url: location.href,
      type: 'GET',
      data: {
        message: { id: latest_message_id }
      },
      dataType: 'json'
    })

    .always(function(undisplayed_messages){
    })
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildNewMessageHTML(message);
      $('.chat-main__body').append(html);
      $('.chat-main__footer-form-text').val('');
      $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast');
    })

    .fail(function() {
      alert('error');
    })

    .always(function() {
      $('.chat-main__footer-form-submit-btn').removeAttr("disabled");
    })
  });
});
