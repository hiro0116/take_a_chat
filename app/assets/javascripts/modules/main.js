$(function(){
  $('#membership').on('click', function(){
    const users = $('.member__name').data('user.name');
    const memberLists = document.createElement('li');
    memberLists.innerText = users;
    console.log(memberLists);
    $('.memberlists').append(memberLists);
  });
});