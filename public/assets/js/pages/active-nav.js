$(document).ready(function(){

    $('.nav-link').on('click', function(e){
            $('.nav li.active').removeClass('active')
            let parent = $(this).parent().addClass('active');
    });
    
 })