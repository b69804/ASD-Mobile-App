// Matthew Ashton
// ASD 1309 Mobile App Project

$('#JQMpageID').on('pageinit',function(){});

$("#addGame").on("pageinit", function(){
    
    var myForm = $('#gameEntry'),
                gameErrorsLink = $("#gameEntryLink")
                ;
		myForm.validate({
		    invalidHandler: function(form, validator){
                },
            
                submitHandler: function() {
                        var data = myForm.serializeArray();
			storeData(data);
			window.location.reload();
			
                }
    });

    $("#clearGames").on('click', function(){
        if(localStorage.length === 0) {
            alert("No Games are Available.");
        }else{
            localStorage.clear();
            alert("Games have been cleared.");
            window.location.reload();
            return false;
        }
    });

var storeData = function(key, value){
            if ($('#key').val() == '') {
                   var ID      = Math.floor(Math.random()*10000001);
                 }else{
		    var ID = $("#key").val();
        }
                var item    = {};
                item.opponet       =["Opponet", $("#opponet").val()];
                item.dateOfGame       =["Date of Game", $("#dateOfGame").val()];
                item.homeAway       =["Home or Away:", $("#homeAway").val()];
                item.competition          =["Competition:", $("#competition").val()];
                item.mustWatch          =["Is This a Must Watch Game?:", $("#mustWatch").val()];
                item.prediction       =["Prediction:", $("#prediction").val()];
		
        localStorage.setItem(ID, JSON.stringify(item));
        alert("Game Saved!");
	var ID= key;
	window.location.reload();
	  
    };
});

$("#browseGames").on("pageinit", function(){
    
    $("#loadJSON").on('click', function(){
	$.ajax({
	    url: "xhr/data.json",
	    type: "GET",
	    dataType: "json",
	    success: function(response){
		for (var i= 0, j=response.items.length; i<j ; i++){
		    var item = response.items[i];
		    $( "<h3>Opponet:  "+item.opponet+"</h3>"+
                "<p><strong> Date of Game:  "+item.dateOfGame+"</strong></p>"+
                "<p>Is MUFC Home or Away?  "+item.homeAway+"</p>" +
                "<p>Competition:  "+item.competition+"</p>" +
		"<p>Is this a Must Watch Game?  "+item.mustWatch+"</p>" +
		"<p>Match Prediction:  "+item.prediction+"</p>").appendTo('#gameList').trigger("create");
		};
	    }
	});
    });
    
    $("#loadXML").on('click', function(){
	$.ajax({
	    url: "xhr/data.xml",
	    type: "GET",
	    dataType: "xml",
	    success: function(xml){
		var items = $(xml);
		items.find("item").each(function(){
		    var item = $(this);
		    $( "<li>" + "<h3>Opponet:  "+item.find("opponet").text()+"</h3>"+
		    "<p><strong> Date of Game:  "+item.find("dateOfGame").text()+"</strong></p>"+
		    "<p>Is MUFC Home or Away?  "+item.find("homeAway").text()+"</p>" +
		    "<p>Competition:  "+item.find("competition").text()+"</p>" +
		    "<p>Is this a Must Watch Game?  "+item.find("mustWatch").text()+"</p>" +
		    "<p>Match Prediction:  "+item.find("prediction").text()+"</p>" + "</li>").appendTo('#gameList').trigger("create");
		});
	    }	
	});
    });
    
    $("#localStorage").on('click', function(){
        $("#gameList").empty();
        for (var i= 0, j=localStorage.length; i<j ; i++){
            var key = localStorage.key(i);
            var item = JSON.parse(localStorage.getItem(key));
            var makeSubList = $("<li></li>");
            var makeSubLi = $( "<li>" + "<h3>Opponet:  "+item.opponet[1]+"</h3>"+
                "<p><strong> Date of Game:  "+item.dateOfGame[1]+"</strong></p>"+
                "<p>Is MUFC Home or Away?  "+item.homeAway[1]+"</p>" +
                "<p>Competition:  "+item.competition[1]+"</p>" +
		"<p>Is this a Must Watch Game?  "+item.mustWatch[1]+"</p>" +
		"<p>Match Prediction:  "+item.prediction[1]+"</p>" +
		"<a href='#addGame' data-role='button' id='"+ key +"' class='editGame'>Edit Game</a>" +
		"<a href='#' data-role='button' id='"+ key +"' class='deleteGame'>Delete Game</a>" + "</li>")
	    makeSubLi.addClass('newList');
            makeSubLi.appendTo("#gameList").trigger("create");
	    $('.editGame').on('click', function(){
		var editGameEntry = this.key;
		$('#opponet').val(item.opponet[1]);
		$('#dateOfGame').val(item.dateOfGame[1]);
		$('#homeAway').val(item.homeAway[1]);
		$('#competition').val(item.competition[1]);
		$('#mustWatch').val(item.mustWatch[1]);
		$('#prediction').val(item.prediction[1]);
		
		
	    });
	    $(".deleteGame").on('click', function(){
		alert("Are you sure you want to do that?");
		localStorage.removeItem(key);
		alert("Game Deleted");
		window.location.reload();
	    });	     
        };

        $("gameList").listview('refresh');
	
	
    });
    
    
});