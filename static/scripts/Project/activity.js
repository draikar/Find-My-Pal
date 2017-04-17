var currentUrl = window.location.href;

var url = currentUrl.split('?');
var user_id = url[1].split('=');

var uid = user_id[1];


// Initialize Firebase
var config = {
    apiKey: "AIzaSyD8_nEsadS4xowGxBSAzipb5r1uqRiu6V4",
    authDomain: "dev-findmypal.firebaseapp.com",
    databaseURL: "https://dev-findmypal.firebaseio.com",
    projectId: "dev-findmypal",
    storageBucket: "dev-findmypal.appspot.com",
    messagingSenderId: "116241201934"
};

firebase.initializeApp(config);

/* ================== Event Management ============================*/

var app = angular.module('myApp', ['firebase']);

var databaseRef = firebase.database().ref().child('Events').child(uid);


app.controller('ActivityController', ['$scope', '$firebaseArray', '$firebaseObject', function ($scope, $firebaseArray, $firebaseObject) {

    var joinedActivityDbRef = firebase.database().ref().child('joinedActivities').child(uid);

    console.log(joinedActivityDbRef);

    //====================New Event Posting to database =======================//
    var eventObj = {};

    $scope.postNewEvent = function () {
        eventObj.title = document.getElementById('event-title').value;
        eventObj.description = document.getElementById('event-description').value;
        eventObj.location = document.getElementById('event-location').value;
        eventObj.time = document.getElementById('event-time').value;
        eventObj.date = document.getElementById('event-date').value;


        var events = $firebaseArray(databaseRef);

        events.$add(eventObj).then(function (databaseRef) {

            var id = databaseRef.key;
            console.log("added record with id " + id);

            updateObject(id);

            // returns location in the array
        });
        function updateObject(refId) {

            eventObj.id = refId;
            databaseRef.child(refId).set(eventObj).then(function () {

                //$scope.events = $firebaseArray(databaseRef);
                console.log("object created");


            });
        }

    }
    //====================New Event Posting to database =======================//


    //===========================Event Deletion==============================//

    $scope.DeleteEvent = function ($event, event) {

        var events = $firebaseArray(databaseRef);
       
        $scope.events.$remove(event);

        joinedActivityDbRef.child(event.$id).remove().then(function () {

            console.log("Deleted from joined events if the event is joined")
        });

        
    }

    //===========================Event Deletion==============================//



    //=======================Show created Events and new Event Creation =============================//
    $scope.showCreadtedActivities = function () {

        $scope.myView = "createdActivities";
        $scope.events = $firebaseArray(databaseRef);
       

    }

    $scope.showNewEventCreation = function () {

        $scope.myView = "newEventCreation";
       

    }
    //=======================Show created Events and new Event Creation =============================//



    //===========================Trimmed Result && Interested Category ===========================//

    $scope.trimmedResult = function (eventTitle) {


        var databaseRefTrimResults = firebase.database().ref().child('Events');

       

        if (eventTitle != "Interested") {

            $scope.myView = "trimmedActivites";
            $scope.events = $firebaseArray(databaseRefTrimResults);
            console.log($scope.events);
            $scope.myTitle = eventTitle;
           
        }
        else {

            // Interested Activities 
            $scope.myView = "interestedActivities";
            var databaseUserProfileRef = firebase.database().ref().child('user_profiles');
            var specificUsrRef = databaseUserProfileRef.child(uid + "/interested_category");
            $scope.events = $firebaseArray(databaseRefTrimResults);
            $scope.interestedCategory = $firebaseArray(specificUsrRef);
           
        }




    }

    //===========================Trimmed Result && Interested Category ===========================//


    //============================Current Event View ===================================//

    $scope.viewCurrentEvent = function (event) {

        console.log(event);
        $scope.currentEvent = event;

        $scope.myView = "currentEventView";
        //Check for Joined Activity 
        var eventsJoined = $firebaseArray(joinedActivityDbRef);
       
        eventsJoined.$loaded().then(function (eventsJoined) {

            if (event.$id) {
                $scope.recordExist = angular.isObject(eventsJoined.$getRecord(event.$id));
            }
            else {
                $scope.recordExist = angular.isObject(eventsJoined.$getRecord(event.id));
            }
            
           

        });
       

    }

    //=============================Current Event View Ends Here ========================//


    //============================Joined Activity Code Starts Here ======================//

    $scope.joinActivity = function (event) {
       
        var newEvent = angular.copy(event); //This is created to preserve the $$hashkey,$id,$priority property in the original object
       
        console.log(newEvent);
        var id;
        if (event.$id) {
            id = event.$id;
        }
        else {
            id = event.id;
        }
        
        delete newEvent.$$hashKey;
        delete newEvent.$id;
        delete newEvent.$priority;
        joinedActivityDbRef.child(id).set(newEvent).then(function () {

            $scope.joinedNewEvents = $firebaseArray(joinedActivityDbRef);
            $scope.recordExist = true;

        });
    }

    $scope.unjoinActivity = function (event) {

        var id;
        if (event.$id) {
            id = event.$id;
        }
        else {
            id = event.id;
        }
       
        joinedActivityDbRef.child(id).remove().then(function (eventsJoined) {

            $scope.joinedNewEvents = $firebaseArray(joinedActivityDbRef);
            $scope.recordExist = false;

        });
    }

    $scope.showJoinedActivities = function () {
        $scope.myView = "joinedActivities";
        $scope.joinedActivities = $firebaseArray(joinedActivityDbRef);
        
    }

    //=============================Joined Activity Code Ends Here ========================//

    

}]);


/* ================== Event Management ============================*/

$(document).ready(function () {


    var currentUser;

    //sign In and Sign Out recognition

    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            currentUser = user;
            document.getElementById("username").innerHTML = user.displayName;

        }
        else {
            console.log('error');
        }

    });
    //Sign out





    // Create a root reference for storage
    var storageRef = firebase.storage().ref();
    var storageReference = firebase.storage().ref('/userProfilePictures/' + uid);

    //Checking for an Profile picture
    storageReference.getDownloadURL().then(function (url) {

        // Or inserted into an <img> element:
        var img = document.getElementById('profile_picture');
        img.src = url;
    }).catch(function (error) {

        // Attaching the image to the image source 
        storageRef.child('images/default-avatar.jpg').getDownloadURL().then(function (url) {

            // Or inserted into an <img> element:
            var img = document.getElementById('profile_picture');
            img.src = url;
        }).catch(function (error) {
            console.log(error.message);
        });


    });

    //Signout function 


    $("#logout").on('click', function () {

        firebase.auth().signOut().then(function () {
            // Sign-out successful.

        }, function (error) {
            // An error happened.
        });

    });



    //Profile Page Forwarding 

    $(".activity #profile_picture").on('click', function () {


        $("#homepage input").val(uid);
        $("#homepage").submit();


    });



    $(".left-nav-list p").on('click', function () {

        $(this).parent().siblings('div.left-nav-list').find('ul').hide('slow');
        $(this).siblings('ul').show('slow');

    });



});