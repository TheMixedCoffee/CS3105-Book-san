$(document).ready(function() {
    $('#addProductForm').on('submit', function(){
        let productName = $('#productNameInput').val();
        let productDesc = $('#productDescInput').val();
        let productAuthor = $('#productAuthorInput').val();
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
        
        if(variantList.length > 0){
            $.ajax({
                type:'POST',
                url:'/add_product',
                data: {productName: productName, productDesc: productDesc, productAuthor: productAuthor, variantList : variantList},
                success: function(data){
                    location.reload();
                    $('#addVariantError').css("display","none");
                }
            })
        }else{
            $('#addVariantError').css("display","block");
        }
       

        return false;
    });
});