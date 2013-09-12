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
    
    $("#localStorage").on('click', function(){
        $("#gameList").empty();
        for (var i= 0, j=localStorage.length; i<j ; i++){
            var key = localStorage.key(i);
            var item = JSON.parse(localStorage.getItem(key));
            var makeSubList = $("<li></li>");
            var makeSubLi = $( "<h3>Opponet:  "+item.opponet[1]+"</h3>"+
                "<p><strong> Date of Game:  "+item.dateOfGame[1]+"</strong></p>"+
                "<p>Is MUFC Home or Away?  "+item.homeAway[1]+"</p>" +
                "<p>Competition:  "+item.competition[1]+"</p>" +
		"<p>Is this a Must Watch Game?  "+item.mustWatch[1]+"</p>" +
		"<p>Match Prediction:  "+item.prediction[1]+"</p>" +
		"<a href='#addGame' data-role='button' id='"+ key +"'>Edit</a>" + "<br>" +
		"<a href='#' data-role='button' id='"+ key +"' class='deleteGame'>Delete</a>")
            //var makeLink = $("<a href='#addGame' data-role='button' id='"+ key +"'>Edit</a>");
            //makeLink.prepend(makeSubLi);
	   // makeLink.on('click', function(editGame){});
	    $('+ key +').on('click', function(){});
	    
            makeSubLi.appendTo("#gameList");
	    
	    $(".deleteGame").on('click', function(){
		localStorage.removeItem(key);
		alert("Game Deleted");
		window.location.reload();
	    });
	    
	    
	    
	    //var ask = alert("Are you absolutely sure you want to delete this game?");
		  //  if (ask) {
		//	localStorage.removeItem('+ key +');
		//	window.location.reload();
		  //  }else{
		//	alert("Game was NOT deleted!");
		//    }
	    //});	     
        };

        $("gameList").listview('refresh');
	
	
    });
    
    
});