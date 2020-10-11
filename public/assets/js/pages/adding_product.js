$(document).ready(function() {
    $('#addProductForm').on('submit', function(){

        let productName = $('#productNameInput').val();
        let productDesc = $('#productDescInput').val();
        let variantList = [];
        $('input:checked').each(function(){
            let variant = {
                name: $(this).val(),
                price: $('#' + $(this).val() + 'PriceInput').val(),
                stock: $('#' + $(this).val() + 'StockInput').val(),
            }
            variantList.push(variant);
            console.log(variantList);
        });
        
        $.ajax({
            type:'POST',
            url:'/add_product',
            data: {productName: productName, productDesc: productDesc, variantList : variantList},
            success: function(data){
                location.reload();
            }
        })

        return false;
    });
});