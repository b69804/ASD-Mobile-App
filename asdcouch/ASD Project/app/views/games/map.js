function (doc) {
        emit(doc._id,{
            "opponet": doc.opponet,
            "dateOfGame": doc.dateOfGame,
            "homeAway": doc.homeAway,
            "competition": doc.competition,
            "mustWatch": doc.mustWatch,
            "prediction": doc.prediction
            
        });
}