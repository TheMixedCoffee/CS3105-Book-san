// $(document).ready(function(){
//     $(".insertTransaction").click(function(){
//         let product = $(this).closest("tr").find(".product-name").text();
//         let variant = $(this).closest("tr").find(".product-variant").text();
//         let price = $(this).closest("tr").find(".product-price").text();
//         let finalProduct = product + " " + variant;
//         // $("#cart-body").append("")
//         console.log(finalProduct);
//     })
// })

$(document).ready(function() {
    // $('.insertTransaction').on('click', function(){

    //     let product = $(this).closest("tr").find(".product-name").text();
    //     let variant = $(this).closest("tr").find(".product-variant").text();
    //     let price = $(this).closest("tr").find(".product-price").text();
    //     $('input:checked').each(function(){
    //         let variant = {
    //             name: $(this).val(),
    //             price: $('#' + $(this).val() + 'PriceInput').val(),
    //             stock: $('#' + $(this).val() + 'StockInput').val(),
    //         }
    //         variantList.push(variant);
    //         console.log(variantList);
    //     });
        
    //     $.ajax({
    //         type:'POST',
    //         url:'/add_product',
    //         data: {productName: productName, productDesc: productDesc, productAuthor: productAuthor, variantList : variantList},
    //         success: function(data){
    //             location.reload();
    //         }
    //     })

    //     return false;
    // });
    $(".insertTransaction").click(function(){
        let i = 1;
        let sum = 0;
        let product = $(this).closest("tr").find(".product-name").text();
        let variant = $(this).closest("tr").find(".product-variant").text();
        let price = $(this).closest("tr").find(".product-price").text();
        let finalProduct = product + " - " + variant;
        $("#cart-body").append("<tr class = 'cart-product pl-3' id = " + i + "> <td class='text-left product-cart pl-3'>" + finalProduct + "</td> <td class='text-left price-cart'>" + price +" </th> <td class='text-center quantity-cart'> <input type = 'number' class = 'qty-input' min = '1' placeholder = '1'> </td> <td class='text-center remove-cart'> <button type = 'button' class = 'btn btn-danger'> <i class='fas fa-trash-alt'></i> </button></td></tr>")
        console.log(finalProduct);
    })
});