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
			
                }
    });

// $("#submit").on("click", function(){
        //if ($('#key').val() == "") {
          //  var key = Math.floor(Math.random()*10000001);
        //} else {
          //  var key = $("#key").val();
        //}
        //var opponet = $("#opponet").val();
        //var dateOfGame = $("#dateOfGame").val();
        //var homeAway = $("#homeAway").val();
        //var competition = $("#competition").val();
        //var mustWatch = $("mustWatch").val();
        //var prediction = $("#prediction").val();
        
          //  $(".display ul").append('<li><a href="#" data-key="' + key + '" class="edit">' + opponet + "" + dateOfGame + "" + homeAway + "" + competition + "" + mustWatch + "" + prediction + '</a></li>');
            //$(".edit").on("click",function(){
              // var myKey = $(this).data("key");
                //})
        //}); 
var storeData = function(key){
                if (!key) {
                   var ID      = Math.floor(Math.random()*10000001);
                 }else{
                    ID = key;
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
	reloadPage:true
    };
});

$("#browseGames").on("pageinit", function(){
    
    $("#localStorage").on('click', function(){
        $("#gameList").empty();
        for (var i= 0, j=localStorage.length; i<j ; i++){
            var key = localStorage.key(i);
            var item = JSON.parse(localStorage.getItem(key));
            var makeSubList = $("<li></li>");
            var makeSubLi = $( "<h3>"+item.opponet[1]+"</h3>"+
                "<p><strong>"+item.dateOfGame[1]+"</strong></p>"+
                "<p>"+item.homeAway[1]+"</p>" +
                "<p>"+item.competition[1]+"</p>" +
		"<p>"+item.mustWatch[1]+"</p>" +
		"<p>"+item.prediction[1]+"</p>");
            var makeLink = $("<a href='#' id='"+key+"'>Edit</a>");
            makeLink.on('click', function(){
                console.log("This is my key: "+this.id);
            });
            makeLink.html(makeSubLi);
            makeSubList.append(makeLink).appendTo("#gameList");
        }; 
        $("gameList").listview('refresh');
    });
        
});