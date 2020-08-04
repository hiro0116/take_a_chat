$(function(){
  function buildHTML(message){
    if (message.img){
      let html = `
        <div class="chat" data-message-id=${message.id}>
          <div class="chat__user">
            ${message.user_name}
          </div>
          <div class="chat__comment">
            <p class="chat__text">
              ${message.text}
            </p>
            <img class="chat__image" src="${message.image}">
          </div>
          <div class="chat__day">
            <div class="chat__day__time">
              ${message.created_at}
            </div>
          </div>
        </div>`
    return html;
    } else {
      let html =`
      <div class="chat" data-message-id=${message.id}>
        <div class="chat__user">
          ${message.user_name}
        </div>
        <div class="chat__comment">
          <p class="chat__text">
            ${message.text}
          </p>
        </div>
        <div class="chat__day">
          <div class="chat__day__time">
            ${message.created_at}
          </div>
        </div>
      </div>`
    return html;
    }
  }
  $('.form').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this)
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-log').append(html);
      $('form')[1].reset();
      $('.chat-log').animate({ scrollTop: $('.chat-log')[0].scrollHeight});
      $('.send').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.send').prop("disabled", false);
    })
  })
});