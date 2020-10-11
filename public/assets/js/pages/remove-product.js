$(document).ready(function(){
    $("#removeProductModal").on('show.bs.modal', function(e){
        let button = $(e.relatedTarget);
        let clickedButtonId = button.data('id');

        $("#removeProductModal .modal-title").html("Remove " + clickedButtonId);

        $('.current-div').each(function(){
            $(this).remove();
        })

        $.ajax({
            type: 'POST',
            url: '/remove_product',
            data: {removeProductName: clickedButtonId},
            success: function(data){
                console.log(data.variant_name_list);
                for( let i = 0; i< data.variant_name_list.length; i++){
                    let variant = $("#removePrototype .variant-div").clone();
                    variant.addClass("current-div");
                    variant.find('.variant-name-span').text(data.variant_name_list[i]);
                    variant.appendTo('.modal-body');
                }
            }
        })
    })
    
    $('#finalRemoveVariantBtn').on('click', function(){
        
    })
})