$(document).ready(function(){
	$("select.uni").change(function(){
		var x = $(this).children("option:selected").val()
    	if (x == "Marvel") {
        	$("#mcu").css({"display":"unset"})
        	$("#dc").css({"display":"none"})
        }
        else if (x == "DC") {
        	$("#mcu").css({"display":"none"})
        	$("#dc").css({"display":"unset"})
        }
    });
});

