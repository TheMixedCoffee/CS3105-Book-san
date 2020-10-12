$(document).ready(function(){
    $("input").click(function(){
        let product_id = $(this).attr("id");
        let variant_id = $(this).attr("class").split(" ")[2];
        console.log(product_id, variant_id);
        window.location.replace("/add_cart/"+product_id+"/"+variant_id);
        // $.ajax({
        //     type: 'GET',
        //     // url: "/add_cart/?item_id=" + product_id + "&variant_id=" + variant_id,
        //     url: '/add_cart/item_id='+product_id+'&variant_id='+variant_id,
        //     // data: {
        //     //     product_id: product_id,
        //     //     variant_id: variant_id
        //     // }
        //     // success(data){
        //     //     alert("WOW");
        //     // }
        // })
    })
    
    // let variant_id = $("form").attr("class");
    // $("#editProductModal").on('show.bs.modal', function(e){
    //     let button = $(e.relatedTarget);
    //     selected = $('#selectVariant option:selected').val()
    //     clickedButtonId = button.data('id');

    //     $("#editProductModal .modal-title").html("Edit " + clickedButtonId);

    //     $.ajax({
    //         type:'POST',
    //         url:'/get_edit_product_info',
    //         data: {editProductName: clickedButtonId, selected: selected},
})