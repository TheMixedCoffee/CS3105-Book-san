// $(document).ready(function(){

//     $(".add").on('click', function(){
  
        // let inputUser = $(this).val();
        // let inputPass = $('#passwordInput').val();
  
        // $.ajax({
        //   type: 'POST',
        //   url: '/auth',
        //   data: {
        //     username: inputUser,
        //     password: inputPass
        //   },
        //   success: function(data){
        //     //do something with the data via front-end framework
        //     if(data.redirect == "/landing?error=1"){
        //       var showError = $('#errorText').css("display", "block");
        //     }else{
        //       window.location = data.redirect;
        //     }
        //   }
        // });
  
        // return false;
        // let row = document.getElementsByClassName(".cart-product")
        // let x = row.insertCell(-1);
        // x.innerHTML = "WOW"  
    // });
//  })

$(document).ready(function(){
    $(".insertTransaction").click(function(){
        let product = $(this).closest("tr").find(".product-name").text();
        let variant = $(this).closest("tr").find(".product-variant").text();
        let price = $(this).closest("tr").find(".product-price").text();
        let finalProduct = product + " " + variant;
        // $("#cart-body").append("")
        console.log(finalProduct);
    })
})