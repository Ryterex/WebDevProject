$(document).ready(function(){
	$("select.uni").change(function() {
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

    $("#myForm input").change(function() {
    	var radio = $('input[name=radioName]:checked', '#myForm').val();
    	if (radio == "name") {
    		$("#personID").css({"display":"unset"});
    	}
    	else if (radio == "power") {
    		$("#personID").css({"display":"none"});
    	}
    	else if (radio == "movie") {
    		$("#personID").css({"display":"none"});
    	}
    });

/*
    $('#search').on("submit", function(e) {
    	let uni = $("select.uni").children("option:selected").val();
    	let type = $('input[name=radioName]:checked', '#myForm').val();
    	let value = "";

    	if (type == "name") {
    		let name = $("#personID").val()
    		if (!name) {
	    		$('#error').text("Error: You must input a name!");
	    		return false;
    		}
    		value = name;
    	}
    	else if (type == "Power") {
    		value = $("select.power").children("option:selected").val();
    	}
    	else if (type == "Movie" && name == "Marvel") {
    		value = $("select.mcu").children("option:selected").val();
    	}
    	else if (type == "Movie" && name == "DC") {
    		value = $("select.mcu").children("option:selected").val();
    	}
    	$('')
    	return true;
    });
*/
    function getRadioButtonValue() {
    	var type = $('input[name=radioName]:checked', '#myForm').val();
    	$("input[name='selectedRadioType']").val(type);
    	
    	let uni = $("select.uni").children("option:selected").val();
    	var value = "";
    	if (type == "name") {
    		let name = $("#personID").val()
    		if (!name) {
	    		$('#error').text("Error: You must input a name!");
	    		return false;
    		}
    		value = name;
    	}
    	else if (type == "Power") {
    		value = $("select.power").children("option:selected").val();
    	}
    	else if (type == "Movie" && name == "Marvel") {
    		value = $("select.mcu").children("option:selected").val();
    	}
    	else if (type == "Movie" && name == "DC") {
    		value = $("select.mcu").children("option:selected").val();
    	}
    	$("input[name='selectedRadioValue']").val(value);
    	$("input[name='universe']").val(uni);
    	return true;
    }

});

