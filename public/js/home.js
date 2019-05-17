$(document).ready(function(){
	$("select.uni").change(function(){
		var universe = $(this).children("option:selected").val();
    	if (universe == "Marvel") {
        	$("#mcu").css({"display":"unset"});
        	$("#dc").css({"display":"none"});
        }
        else if (universe == "DC") {
        	$("#mcu").css({"display":"none"});
        	$("#dc").css({"display":"unset"});
        }
    });

    $('#search').on('submit', function(e) {
    	let name = $("#personID").val();
    	let uni = $("select.uni").children("option:selected").val();
    	let filter = $('input[name=radioName]:checked', '#myForm').val();
    	let power = "";
    	let movie = "";
    	
    	if (!name) {
    		$('#error').text("Error: You must input a name!");
    		return false;
    	}
    	
    	if (filter == "Power") {
    		power = $("select.power").children("option:selected").val();
    	}
    	else if (filter == "Movie" && name == "Marvel") {
    		movie = $("select.mcu").children("option:selected").val();
    	}
    	else if (filter == "Movie" && name == "DC") {
    		movie = $("select.mcu").children("option:selected").val();
    	}
    	return true;
    });
});

