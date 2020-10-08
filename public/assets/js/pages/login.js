$(document).ready(function(){

    $('form').on('submit', function(){
  
        var inputUser = $('#usernameInput').val();
        var inputPass = $('#passwordInput').val();
  
        $.ajax({
          type: 'POST',
          url: '/login',
          data: {username: inputUser, password: inputPass},
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        });
  
        return false;
  
    });
}