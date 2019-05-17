$(document).ready(function(){
    if (document.getElementById("marvel").selected) {
        $('#mcu').show();
    }
    else if (document.getElementById("dc").selected) {
        $('#mcu').hide();
    }
    });
