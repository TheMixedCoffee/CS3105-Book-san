$(document).ready(function(){

    $('#loginForm').on('submit', function(){
  
        var inputUser = $('#usernameInput').val();
        var inputPass = $('#passwordInput').val();
  
        $.ajax({
          type: 'POST',
          url: '/login',
          data: {
            username: inputUser,
            password: inputPass
          },
          success: function(data){
            //do something with the data via front-end framework
            if(data.redirect == "/landing?error=1"){
              var showError = $('#errorText').css("display", "block");
            }else{
              window.location = data.redirect;
            }
          }
        });
  
        return false;
  
    });
 })