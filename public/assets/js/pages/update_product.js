$(document).ready(function(){
    let updateInfo;
    let selected;
    let clickedButtonId;
    let item_id;

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
                $('#editPriceInput').val(data.item_info[3].variantPrice);
                $('#editStockLabel').text("Current Stock: " + data.item_info[4].variantStock);

                item_id = data.item_info[0].item_id
                //     item_name: $('#editNameInput').val(),
                //     item_desc: $('#editDescInput').val(),
                //     item_author: $('#editAuthorInput').val(),
                //     item_price: $('#editPriceInput').val(),
                //     item_stock: $('#editStockInput').val(),
                //     selected: selected
                // }
                // console.log(updateInfo);
            }
        })
    })

    $('#selectVariant').change(function(){
        selected = $('#selectVariant option:selected').val();

        $.ajax({
            type:'POST',
            url:'/get_edit_product_info',
            data: {editProductName: clickedButtonId, selected: selected},
            success: function(data){
                $('#editNameInput').val(clickedButtonId);
                $('#editDescInput').val(data.item_info[1].item_desc);
                $('#editAuthorInput').val(data.item_info[2].item_author);
                $('#editPriceInput').val(data.item_info[3].variantPrice);
                $('#editStockLabel').text("Current Stock: " + data.item_info[4].variantStock);
                item_id = data.item_info[0].item_id
                //     item_name: $('#editNameInput').val(),
                //     item_desc: $('#editDescInput').val(),
                //     item_author: $('#editAuthorInput').val(),
                //     item_price: $('#editPriceInput').val(),
                //     item_stock: $('#editStockInput').val(),
                //     selected: selected
                // }
                // console.log(updateInfo);
            }
        })
    })

      $(document).on('click','#editProductBtn',function(e) {
        updateInfo = {
            item_id: item_id,
            item_name: $('#editNameInput').val(),
            item_desc: $('#editDescInput').val(),
            item_author: $('#editAuthorInput').val(),
            item_price: $('#editPriceInput').val(),
            item_stock: $('#editStockInput').val(),
            selected: selected
        }

        $.ajax({
            type: 'POST',
            url: '/update_product',
            data: {updateInfo: updateInfo},
            success: function(data){
                console.log("Wow");
                location.reload();
            }
        })

        return false;
      });
})