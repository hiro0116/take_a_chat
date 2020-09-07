$(function(){
  $('.group__member').on('click', function(){
    const memberLists = document.createElement('li');

    memberLists.innerText = "bob";
    console.log(memberLists);
    // $('.memberlists').append(memberLists);
  });
});