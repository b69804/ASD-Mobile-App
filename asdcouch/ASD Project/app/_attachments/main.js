// Matthew Ashton
// ASD 1309 Mobile App Project

var storeData = function(key, value){
            if ($('#key').val() == '') {
                   var ID      = Math.floor(Math.random()*10000001);
                 }else{
		    var ID = $("#key").val();
        }
        var ID= key;
                var item = {};
                item.opponet       =["Opponet", $("#opponet").val()];
                item.dateOfGame       =["Date of Game", $("#dateOfGame").val()];
                item.homeAway       =["Home or Away:", $("#homeAway").val()];
                item.competition          =["Competition:", $("#competition").val()];
                item.mustWatch          =["Is This a Must Watch Game?:", $("#mustWatch").val()];
                item.prediction       =["Prediction:", $("#prediction").val()];
		
        //localStorage.setItem(ID, JSON.stringify(item));
        $.couch.db('asdproject').saveDoc(item, function(){
            success: function(item){
                     console.log('Nope');   
            },
            error: function(){
                        console.log('Data not stored');
            }
            })
        alert("Game Saved!");
	
	window.location.reload();
	  
    };

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
    
    $("#editGames").on('click', function(){
        $("#gameList").empty();
        for (var i= 0, j=localStorage.length; i<j ; i++){
	    $('#gameEntry').hide();
            var key = localStorage.key(i);
            var item = JSON.parse(localStorage.getItem(key));
            var makeSubList = $("<li></li>");
            var makeSubLi = $( "<li>" + "<h3>Opponet:  "+item.opponet[1]+"</h3>"+
                "<p><strong> Date of Game:  "+item.dateOfGame[1]+"</strong></p>"+
                "<p>Is MUFC Home or Away?  "+item.homeAway[1]+"</p>" +
                "<p>Competition:  "+item.competition[1]+"</p>" +
		"<p>Is this a Must Watch Game?  "+item.mustWatch[1]+"</p>" +
		"<p>Match Prediction:  "+item.prediction[1]+"</p>" +
		"<a href='#' data-role='button' data-key='"+ key +"' class='editGame'>Edit Game</a>" +
		"<a href='#' data-role='button' data-key='"+ key +"' class='deleteGame'>Delete Game</a>" + "</li>")
	    makeSubLi.addClass('newList');
            makeSubLi.appendTo("#gameList").trigger("create");
	
	};
	    $('.editGame').on('click', function(){
		$('#gameEntry').show();
		var editGameEntry = $(this).data('key');
		var formEntry = $("#gameEntry");
		$('#key').val(editGameEntry);
		$('#opponet').val(item.opponet[1]);
		$('#dateOfGame').val(item.dateOfGame[1]);
		$('#homeAway').val(item.homeAway[1]);
		$('#competition').val(item.competition[1]);
		$('#mustWatch').val(item.mustWatch[1]);
		$('#prediction').val(item.prediction[1]);
				
		formEntry.addClass('newForm');
		formEntry.appendTo("#gameList");
		$('#editClear').hide();
		console.log(editGameEntry);
		$('#submit').on('click', storeData);
	    });
	    
	    
	    $(".deleteGame").on('click', function(){
		alert("Are you sure you want to do that?");
		localStorage.removeItem(key);
		alert("Game Deleted");
		window.location.reload();
	    });	     
       

        $("gameList").listview('refresh');
	
    });

});    

$("#browseGames").on("pageinit", function(){
            
	$.ajax({
	    url: "_view/games",
	    type: "GET",
	    dataType: "json",
	    success: function(data){
                   $.each(data.rows, function(index, item){
                        var opponet = item.value.opponet;
                        var dateOfGame = item.value.dateOfGame;
                        var homeAway = item.value.homeAway;
                        var competition = item.value.competition;
                        var mustWatch = item.value.mustWatch;
                        var prediction = item.value.prediction;
                        $('#gameListSample').append(
                                $('<li>').append(
                                    $( "<h3>Opponet:  "+opponet+"</h3>"+
                                    "<p><strong> Date of Game:  "+dateOfGame+"</strong></p>"+
                                    "<p>Is MUFC Home or Away?  "+homeAway+"</p>" +
                                    "<p>Competition:  "+competition+"</p>" +
                                    "<p>Is this a Must Watch Game?  "+mustWatch+"</p>" +
                                    "<p>Match Prediction:  "+prediction+"</p>")           
                        ).addClass('newList')
            );
            });
            $('#gameListSample').listview('refresh');          
	    }
	});
});

$("#mustWatchGames").on("pageinit", function(){
            
	$.ajax({
	    url: "_view/mustwatch",
	    type: "GET",
	    dataType: "json",
	    success: function(data){
                   $.each(data.rows, function(index, item){
                        var opponet = item.value.opponet;
                        var dateOfGame = item.value.dateOfGame;
                        var homeAway = item.value.homeAway;
                        var competition = item.value.competition;
                        var mustWatch = item.value.mustWatch;
                        var prediction = item.value.prediction;
                        $('#mustWatchList').append(
                                $('<li>').append(
                                    $( "<h3>Opponet:  "+opponet+"</h3>"+
                                    "<p><strong> Date of Game:  "+dateOfGame+"</strong></p>"+
                                    "<p>Is MUFC Home or Away?  "+homeAway+"</p>" +
                                    "<p>Competition:  "+competition+"</p>" +
                                    "<p>Is this a Must Watch Game?  "+mustWatch+"</p>" +
                                    "<p>Match Prediction:  "+prediction+"</p>")           
                        ).addClass('newList')
            );
            });
            $('#gameListSample').listview('refresh');          
	    }
	});
});






