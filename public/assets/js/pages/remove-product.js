$(document).ready(function(){
    let clickedButtonId;

    $("#removeProductModal").on('show.bs.modal', function(e){
        let button = $(e.relatedTarget);
        clickedButtonId = button.data('id');

        $("#removeProductModal .modal-title").html("Remove " + clickedButtonId);

        $('.current-div').each(function(){
            $(this).remove();
        })

        $.ajax({
            type: 'POST',
            url: '/remove_product',
            data: {removeProductName: clickedButtonId},
            success: function(data){
               // console.log(data.variant_name_list);
                for( let i = 0; i< data.variant_name_list.length; i++){
                    let variant = $("#removePrototype .variant-div").clone();
                    variant.addClass("current-div");
                    variant.find('.variant-name-span').text(data.variant_name_list[i]);
                    variant.appendTo('#remove-modal-body');
                }
            }
        })
    })
    

    $(document).on('click','#finalRemoveVariantBtn',function(e) {
        console.log("Clicked remove");
        let variantInfo = {
            variantName:  $(this).prev().text(),
            itemName: clickedButtonId
        }
        console.log(variantInfo.variantName);
        console.log(clickedButtonId);

        $.ajax({
            type: 'POST',
            url: '/remove_product_variant',
            data: {variantInfo: variantInfo},
            success: function(data){
                console.log("Wow");
                location.reload();
                $(this).closest(".variant-div row").remove();
            }
        })

        return false;
      });
})