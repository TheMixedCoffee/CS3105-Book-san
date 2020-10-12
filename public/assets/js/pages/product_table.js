$(document).ready(function() {
    $('#productTable').DataTable();
    let passedInfoArray = [];
    let item_index = 0;
    let passedInfo;

    $(document).on('click','#addCartBtn',function(e) {
        item_index++;
        let item_id = $(this).val();
        let variant_id = $(this).siblings('.hidden-variant-span').text();
        let item_price = $(this).parent().siblings('.product-price').text();
        let item_name = $(this).parent().siblings('.product-name').text();
        let variant_name = $(this).parent().siblings('.product-variant').text()

        passedInfoArray.push({
            item_id:item_id,
            variant_id:variant_id,
            item_price:item_price,
            item_name:item_name,
            variant_name:variant_name,
            item_qty: 1,
            item_index: item_index
        });
        
        let variant = $("#cartPrototype .item-cart-div").clone();
        variant.addClass("added-item-div");
        variant.find(".item-name-span").text(item_name);
        variant.find(".variant-name-span").text(variant_name);
        variant.find(".item-index").text(item_index);
        variant.find(".total-price-span").text("Total price: " + item_price);
        variant.find(".solo-price-span").text(item_price);
        variant.appendTo(".cart-div");
    })

    $(document).on('change', '#quantity-item', function(e){
        console.log("Changed qty");
        let item_qty = $(this).val();
        let item_price = $(this).siblings(".solo-price-span").text();
        item_price = Number(item_price);
        let total_price = Number(item_price) * Number(item_qty);
        console.log(total_price)
        $(this).siblings(".total-price-span").text("Total price: " + total_price.toString());
        let current_index = $(this).parent().find(".item-index").text();
        current_index = parseInt(current_index);
        passedInfoArray[current_index].item_qty = item_qty;
    })

    $(document).on('click','#finalRemoveFromCartBtn',function(e) {
        let current_index = $(this).siblings(".item-index").text();
        current_index = parseInt(current_index);
        passedInfoArray.splice(current_index,1);
        $(this).closest(".item-cart-div").remove();
        location.reload();
      });

      $("#confirmTransactionBtn").on('click', function(){
        $.ajax({
            type: 'POST',
            url: '/confirm_purchase',
            data: {passedInfoArray: passedInfoArray},
            success: function(data){
                $(".added-item-div").each(function(){
                    $(this).remove();
                })
                location.reload();
            }
        })
    })
});