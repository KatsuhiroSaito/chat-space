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

  function appendNewMessageHTML (message) {
    var html = buildNewMessageHTML(message);
    $('.chat-main__body').append(html);
    $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast');
  };

  function changeMessageFormStyle(placeholder_text, icon_color) {
    $('.fa-image').css('color', icon_color);
    $('.chat-main__footer-form-text').attr('placeholder', placeholder_text);
  };

  function auto_update() {
    if($('.message')[0]) {
      var latest_message_id = $('.message:last').attr('data-id');
    } else {
      var latest_message_id = 0;
    }

    $.ajax({
      url: location.href,
      type: 'GET',
      data: { message: { id: latest_message_id } },
      dataType: 'json'
    })
    .done(function(undisplayed_messages){
      $.each(undisplayed_messages, function(i, undisplayed_message) {
        appendNewMessageHTML(undisplayed_message);
      });
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
      appendNewMessageHTML(message);
      $('.chat-main__footer-form-text').val('');
      changeMessageFormStyle("type a message", "black");
    })
    .fail(function() {
      alert('error');
    })
    .always(function() {
      $('.chat-main__footer-form-submit-btn').removeAttr("disabled");
    })
  });

  $('#file-input').change(function() {
    var image_title = $('#file-input')[0].files[0].name;
    changeMessageFormStyle(`type a message (${image_title}を選択中)`, "#38AEF0");
  });

  setInterval(auto_update, 5000);
});
