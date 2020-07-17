$(function(){
  function buildHTML(message){
    if (message.imga){
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

  let reloadMessages = function() {
    let last_message_id = $('.chat:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-log').append(insertHTML);
        $('.chat-log').animate({ scrollTop: $('.chat-log')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 5000);
})