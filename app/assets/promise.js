/**
 * Created by SamCasey on 9/28/15.
 */


function getUser(name) {
    var deferred = new $.Deferred();

    // do something

    setTimeout(function () {
        deferred.resolve({
            name: "Matt"
        });
    }, 3000);

    return deferred.promise();
}

getUser("matt").then(function (user) {
    console.log(user.name); // matt
});


//=====================================================================================


/**
 * Created by SamCasey on 9/28/15.
 */


function getUser(name) {
    return $.get("/user/" + name);
}

deferred.resolve();
deferred.reject();

getUser("matt").then(function (user) {
    console.log(user.name); // matt
}, function (error) {

});

function () {

}
