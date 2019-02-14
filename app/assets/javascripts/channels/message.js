$(function(){
  function buildHTML(message){

    var img = "";
    if (message.image["url"] !== null) {
        img = `<img class="message__lower-image" src="${message.image.url}">`
    }
    var html = `<div class="message">
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

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__body').append(html)
      $('.chat-main__footer-form-text').val('')
      $('.chat-main__footer-form-submit-btn').removeAttr("disabled");
    })

    .fail(function() {
      alert('error');
    })
  });
});
