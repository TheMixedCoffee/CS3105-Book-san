$(document).ready(function(){

    $('#loginForm').on('submit', function(){
  
        let inputUser = $('#usernameInput').val();
        let inputPass = $('#passwordInput').val();
  
        $.ajax({
          type: 'POST',
          url: '/auth',
          data: {
            username: inputUser,
            password: inputPass
          },
          success: function(data){
            //do something with the data via front-end framework
            if(data.redirect == "/landing?error=1"){
              let showError = $('#errorText').css("display", "block");
            }else{
              window.location = data.redirect;
            }
          }
        });
  
        return false;
  
    });
 })