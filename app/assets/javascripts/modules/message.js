$(function(){
  function buildHTML(message){
    if (message.image){
      let html = `
      <li class="chat" data-message-id="${message.id}">
        <div class="chat__user">
          ${message.user_name}
        </div>
        <div class="chat__comment">
          <p class="chat__text">
            ${message.text}
          </p>
          <img class="chat__image" src="${message.image}" width="300" height="300">
        </div>
        <div class="chat__day">
          <div class="chat__day__time">
            ${message.created_at}
          </div>
        </div>
      </li>`
    return html;
    } else {
      let html =`
      <li class="chat" data-message-id="${message.id}">
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
      </li>`
    return html;
    }
  }

  // function buildImg(image){
  //   let html = `
  //         <div class="form__message">
  //           <input class="text" type="text" name="message[text]" id="message_text">
  //         </div>`
  //   return html;
  // }

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

  // イメージプレビュー
  // $( document ).on('change', '.file', function() {
  //   let image = this.result;
  //   let html = buildImg(image);
  //   $('.text').append(html);
    
  // });
});