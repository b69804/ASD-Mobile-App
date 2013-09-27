// Matthew Ashton
// ASD 1309 Mobile App Project

var storeData = function(key, value){
            //if ($('#key').val() == '') {
              //     var ID      = Math.floor(Math.random()*10000001);
                // }else{
		  //  var ID = $("#key").val();
        //}
        
                var item = {};
                item._id         =$("#dateOfGame").val()
                item.opponet       =$("#opponet").val()
                item.dateOfGame       =$("#dateOfGame").val()
                item.homeAway       =$("#homeAway").val()
                item.competition          =$("#competition").val()
                item.mustWatch          =$("#mustWatch").val()
                item.prediction       =$("#prediction").val()
                
		
        //localStorage.setItem(ID, JSON.stringify(item));
        $.couch.db('asdproject').saveDoc(item, {
            success: function(){
                        var key = item._id;
                     console.log(key);   
            },
            error: function(){
                        console.log('Data not stored');
            }
            })
        alert("Game Saved!");
	
	window.location.reload();
	  
    };

$(document).on("pageinit", "#addGameData", function(){        
            
    var myForm = $('#gameEntry'),
                gameErrorsLink = $("#gameEntryLink")
                ;
		myForm.validate({
		    invalidHandler: function(form, validator){
                },
      });      
       $("#submit").on('click',          
                function() {
                        var data = myForm.serializeArray();
			storeData(data);
			window.location.reload();
                }
       );

    
    $("#editGames").on('click', function(){
        
        //for (var i= 0, j=localStorage.length; i<j ; i++){
	//var key = localStorage.key(i);
        //var item = JSON.parse(localStorage.getItem(key));    
            $.couch.db('asdproject').view("trackmufc/games",{
            success: function(data) {
                   $("#gameList").empty();
                   $('#gameEntry').hide();
            $.each(data.rows, function(index, item){
                        var key = item.key;
                        var opponet = item.value.opponet;
                        var dateOfGame = item.value.dateOfGame;
                        var homeAway = item.value.homeAway;
                        var competition = item.value.competition;
                        var mustWatch = item.value.mustWatch;
                        var prediction = item.value.prediction;
                        var makeSubList = $("<li></li>");
                        var makeSubLi = $( "<li>" +  "<h3>Opponet:  "+opponet+"</h3>"+
                        "<p><strong> Date of Game:  "+dateOfGame+"</strong></p>"+
                        "<p>Is MUFC Home or Away?  "+homeAway+"</p>" +
                        "<p>Competition:  "+competition+"</p>" +
                        "<p>Is this a Must Watch Game?  "+mustWatch+"</p>" +
                        "<p>Match Prediction:  "+prediction+"</p>" +
                        "<a href='#' data-role='button' data-key='"+ key +"' class='editGame'>Edit Game</a>" +
                        "<a href='#' data-role='button' data-key='"+ key +"' class='deleteGame'>Delete Game</a>" +
                        "</a>" + "</li>");
	    makeSubLi.addClass('newList');
            makeSubLi.appendTo("#gameList").trigger("create");
            console.log(key);
            });
            },
            error: function(){
                        console.log('Data not stored');
            }
            
            });
	    
            $('ul').on('click', 'li .editGame', function(){
                $.couch.db('asdproject').openDoc($(this).data('key'), {        
                      success: function(data){
                          
                $('#gameList').hide();
		$('#gameEntry').show();
		var formEntry = $("#editGameEntry");
		$('#key').val(data._id);
		$('#opponet').val(data.opponet);
		$('#dateOfGame').val(data.dateOfGame);
		$('#homeAway').val(data.homeAway);
		$('#competition').val(data.competition);
		$('#mustWatch').val(data.mustWatch);
		$('#prediction').val(data.prediction);
				
		formEntry.addClass('newForm');
		formEntry.appendTo("#gameList");
		$('#editClear').hide();
                console.log(data._id);
                $('#editSubmit').on('click', function(){
                        var doc = {
                              _id: $(this).data('_id'),
                              _rev:  $(this).data('_rev'),
                              opponet: $("#opponet").val(),
                              dateOfGame: $("#dateOfGame").val(),
                              homeAway: $("#homeAway").val(),
                              competition: $("#competition").val(),
                              mustWatch: $("#mustWatch").val(),
                              prediction: $("#prediction").val(),
                        };
                        $.couch.db('asdproject').saveDoc(doc, {
                                    success: function(data) {
                                     console.log(data);
                                    },
                                    error: function(status) {
                                    console.log(status);
                                    }
                        });
                        });
            },
            error: function(status) {
                 console.log("nope!");
                 } 
                      
            }); 
	    
	    
	    $('ul').on('click', 'li .deleteGame', function(){
		alert("Are you sure you want to do that?");
		$.couch.db('asdproject').removeDoc($(this).data('key'),{
                        success: function(data){
                          console.log(data);          
                        },
                        error: function(status) {
                                    console.log(status);
                        }
                });        
		alert("Game Deleted");
		window.location.reload();
	    });	     
       

        $("gameList").listview('refresh');
	
    });
      
});   

$(document).on("pageinit", "#browseGames", function(){
            
	$.couch.db('asdproject').view("trackmufc/games",{
            success: function(data) {
                   //$("#listGames").empty();
                   //$('#gameEntry').hide();
            $.each(data.rows, function(index, item){
                        var key = item.key;
                        var opponet = item.value.opponet;
                        var dateOfGame = item.value.dateOfGame;
                        var homeAway = item.value.homeAway;
                        var competition = item.value.competition;
                        var mustWatch = item.value.mustWatch;
                        var prediction = item.value.prediction;
                        var makeSubList = $("<li></li>");
                        var makeSubLi = $( "<li>" + "<h3>Opponet:  "+opponet+"</h3>"+
                        "<p><strong> Date of Game:  "+dateOfGame+"</strong></p>"+
                        "<p>Is MUFC Home or Away?  "+homeAway+"</p>" +
                        "<p>Competition:  "+competition+"</p>" +
                        "<p>Is this a Must Watch Game?  "+mustWatch+"</p>" +
                        "<p>Match Prediction:  "+prediction+"</p>" +
                        "</li>");
	    makeSubLi.addClass('newList');
            makeSubLi.appendTo("#listGames").trigger("create");
            console.log(key);
            });
            },
            error: function(){
                        console.log('Data not stored');
            }
            
            });     
       

        $("listGames").listview('refresh');
	
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
                                    "<p>Match Prediction:  "+prediction+"</p>" + "<a href='#' data-role='button' 'class='editGame'>Edit Game</a>")           
                        ).addClass('newList')
            );
            });
            $('#gameListSample').listview('refresh');          
	    }
	});
});






});