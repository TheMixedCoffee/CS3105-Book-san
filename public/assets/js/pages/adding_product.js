$(document).ready(function() {
    $('#addProductForm').on('submit', function(){

        let productName = $('#productNameInput').val();
        let productDesc = $('#productDescInput').val();
        let variantList = [];
        $('input:checked').each(function(){
            let variant = {
                name: $(this).val(),
                price: $(name + 'priceInput').val(),
                stock: $(name + 'stockInput').val(),
            }
            variantList.push(variant);
        });
        
        $.ajax({
            type:'POST',
            url:'/add_product',
            data: {productName: productName, productDesc: productDesc, variantList : variantList},
            success: function(data){
                //location.reload();
            }
        })
    });
});