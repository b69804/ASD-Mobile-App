function (doc) {
    if (doc._id.val == "num") {
        emit(doc._id);
        
    }
}