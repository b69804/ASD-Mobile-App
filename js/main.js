// Matthew Ashton
// ASD 1309 Mobile App Project

$(document).bind('pageinit',function(){
                
});

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
    };
    

});
