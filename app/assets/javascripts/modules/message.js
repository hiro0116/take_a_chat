$(function(){
  function buildHTML(message){
    if (message.img){
      let html = `
      <li class="chat-current" data-message-id="${message.id}">
        <div class="chat-current__user">
          ${message.user_name}
        </div>
        <div class="chat-current__comment">
          <p class="chat-current__text">
            ${message.text}
          </p>
          <img class="chat-current__image" src="${message.image}">
        </div>
        <div class="chat-current__day">
          <div class="chat-current__day__time">
            ${message.created_at}
          </div>
        </div>
      </li>`
    return html;
    } else {
      let html =`
      <li class="chat-current" data-message-id="${message.id}">
        <div class="chat-current__user">
          ${message.user_name}
        </div>
        <div class="chat-current__comment">
          <p class="chat-current__text">
            ${message.text}
          </p>
        </div>
        <div class="chat-current__day">
          <div class="chat-current__day__time">
            ${message.created_at}
          </div>
        </div>
      </li>`
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