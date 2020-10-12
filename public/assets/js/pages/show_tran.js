function toggle() {
    
}

$(document).ready(function(){
    $(".viewDetails").click(function(){
        let order = $(this).attr("id");
        let account = $(this).attr("class").split(" ")[3];
        let user = ($(this).closest("tr").find(".user").text())[0].toUpperCase() + ($(this).closest("tr").find(".user").text()).slice(1);
        let d = ($(this).closest("tr").find(".datetime").text()).split(" ")[0] + " - " + ($(this).closest("tr").find(".datetime").text()).split(" ")[1] + " " + ($(this).closest("tr").find(".datetime").text()).split(" ")[2] + ", " + ($(this).closest("tr").find(".datetime").text()).split(" ")[3]
        console.log(order, account, user);
        $("#user-id").text(account);
        $("#user-name").text(user);
        $("#date").text(d);
    })
})