$(document).ready(function(){
    let updateInfo;
    let selected;


    $("#editProductModal").on('show.bs.modal', function(e){
        let button = $(e.relatedTarget);
        selected = $('#selectVariant option:selected').val()
        clickedButtonId = button.data('id');

        $("#editProductModal .modal-title").html("Edit " + clickedButtonId);

        $.ajax({
            type:'POST',
            url:'/get_edit_product_info',
            data: {editProductName: clickedButtonId, selected: selected},
            success: function(data){
                $('#editNameInput').val(clickedButtonId);
                $('#editDescInput').val(data.item_info[1].item_desc);
                $('#editAuthorInput').val(data.item_info[2].item_author);
                $('#editPriceInput').val(data.item_info[3].item_price);
                $('#editStockInput').val(data.item_info[4].item_stock);

                updateInfo.item_id = data.item_info[0].item_id;
                updateInfo.item_name = clickedButtonId;
                updateInfo.item_desc = data.item_info[1].item_desc;
                updateInfo.item_author = data.item_info[2].item_author;
                updateInfo.item_price = data.item_info[3].item_price;
                updateInfo.item_stock = data.item_info[4].item_stock;
                updateInfo.selected = selected;
            }
        })
    })


    $(document).on('submit','#editProductBtn',function(e) {
        console.log("Clicked edit");
        console.log(variantInfo.variantName);
        console.log(clickedButtonId);

        $.ajax({
            type: 'POST',
            url: '/update_product',
            data: {updateInfo: updateInfo},
            success: function(data){
                console.log("Wow");
                location.reload();
            }
        })
      });
})