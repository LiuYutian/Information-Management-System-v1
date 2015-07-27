var DeleteEvent = function() {
    $(".delete").unbind().on("click", function() {
        $.ajax({
            url : "./student_name",
            type : "delete",
            data : {id : $(this).parents('tr').children("td").html()},
            success : function(result) {
                if(result.status === 200) {
                    initGUI();
                }else if(result.status !== 200) {
                    console.log(result.message);
                }
            }
        });
    });
}

function initGUI() {
    $.get("/student_names", function(result) {
        $("#tab>tbody").empty();
        result.data.forEach(function(value) {
            $("<tr><td>" + value.id + "</td><td>" + value.name + "</td><td><span class='delete'>删除</span></td></tr>").appendTo($("#tab>tbody"));
        });
        DeleteEvent();
        addEvent();
    });
}

initGUI();

var addEvent = function() {
    $(".btn").unbind().on("click", function() {
        $.post("/student_name", {id : $("#addData").prop("value")}, function(result) {
            if(result.data === "ok") {
                initGUI();
            }
        });
    });
    $("#addData").prop("value", "");
}
