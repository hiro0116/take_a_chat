$(function(){
  function addUser(user) {
    let html = `
                <div class="ChatMember clearfix">
                  <p class="member__name">${user.name}</p>
                  <div class="member__add member__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
                `;
    $("#UserSearchResult").append(html);
  }
  function addNoUser() {
    let html = `
                <div class="ChatMember clearfix">
                  <p class="member__name">ユーザーが見つかりません</p>
                </div>
                `;
    $("#UserSearchResult").append(html);
  }

  function joinUser(userName, userId){
    let html = `
              <div class="ChatMember">
                <p class="member__name">${userName}</p>
                <input name="group[user_ids][]" type="hidden" value="${userId}" />
                <div class="member__remove member__button">削除</div>
              </div>
              `;
  $('.ChatMembers').append(html)
  }

  function followUser(userName){
    let html = `
                <div class="friend__name">
                  <p class="member__name">${userName}</p>
                </div>
                `;
    $('.side__users').append(html);
  }

  $("#UserSearch__field").on("keyup", function() {
    let input = $("#UserSearch__field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users) {
      $("#UserSearchResult").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
    })
    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    });
  });

  $('#UserSearchResult').on('click', ".member__add", function(){
    $('#UserSearchResult').empty();
      let userName = $(this).data('user-name')
      let userId = $(this).data('user-id')
      joinUser(userName, userId);
  });
  $('.ChatMembers').on('click', '.member__remove', function(){
    $(this).parent().remove();
  })

  $('.user-add').on('click', function(){
    $(this).parent().remove();
      let userName = $(this).data('user-name')
      followUser(userName)
  })
});