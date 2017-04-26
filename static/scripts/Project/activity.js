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

var currrent_user_displayName;

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
        currrent_user_displayName = user.displayName;
       
    }
    else {
        console.log('error');
    }

});

//firebase.database().ref('/user_profiles/' + uid).once('value').then(function (snapshot) {
//    currrent_user_displayName = snapshot.val().displayName;
//});


/* ================== Event Management ============================*/

var app = angular.module('myApp', ['firebase']);

var databaseRef = firebase.database().ref().child('Events').child(uid);
var eventsDB = firebase.database().ref().child('Events');

//Uncommnet below for testing
//var databaseRef = firebase.database().ref().child('TestDB-Events').child(uid);
//var eventsDB = firebase.database().ref().child('TestDB-Events');
app.controller('ActivityController', ['$scope', '$firebaseArray', '$firebaseObject', function ($scope, $firebaseArray, $firebaseObject) {

   
    
    $scope.myView = "allActivites";
    $scope.newPost = true;


    //==================Show Error Message if nothing exists =================//


    $scope.showError = function (currentParent) {

        $(function () {
            $(currentParent).find("p#noEventMatch").hide();
        });


    }


    //==================Show Error Message if nothing exists =================//

    //====================New Event Posting to database =======================//
    var eventObj = {};
    


    $scope.postNewEvent = function () {
       
        eventObj.users = [];
        eventObj.joinedUserIds = [];
       

        var title = document.getElementById('event-title').value.trim();
        var category = document.getElementById('event-category').value.trim();
        var description = document.getElementById('event-description').value.trim();
        var location = document.getElementById('event-location').value.trim();
        var time = document.getElementById('event-time').value.trim();
        var date = document.getElementById('event-date').value.trim();
        var currentDate = date.replace(/-/g, "/"); //Converting to proper date format which takes Standard Time into account.
        var dateString = new Date(currentDate);
        var today = new Date();
        var current_time_hours = today.getHours();
        var current_time_minutes = today.getMinutes();

        today.setHours(0, 0, 0, 0) //This is required to compare the date without time into account. We will be validating time in other scenario.

       

        // Validations 

        if (title === "") {
            document.getElementById("eventMessage").innerHTML = "Please Enter the Event Title";
            showMsg();
            return
        } else {
            eventObj.title = title;
        }
       
        if (category === "none") {
            document.getElementById("eventMessage").innerHTML = "Please Select the Event Category";
            showMsg();
            return
        } else {
            eventObj.category = category;
        }

        if (description === "") {
            document.getElementById("eventMessage").innerHTML = "Please Enter the Event Description";
            showMsg();
            return
        } else {
            eventObj.description = description;
        }

        if (location === "") {
            document.getElementById("eventMessage").innerHTML = "Please Enter the Event Location";
            showMsg();
            return
        } else {
            eventObj.location = location;
        }

        if (time === "") {
            document.getElementById("eventMessage").innerHTML = "Please Enter the Event Time";
            showMsg();
            return
        }
        else {
            var eventTime = time.split(":");
            var eventTime_hours = eventTime[0];
            var eventTime_minutes = eventTime[1];
            console.log(eventTime_hours + ":" + eventTime_minutes);
            console.log(current_time_hours + ":" + current_time_minutes);
            
            if (eventTime_hours < current_time_hours) {
                
                if (date === "") {

                    document.getElementById("eventMessage").innerHTML = "Please Enter the Valid Date";
                    showMsg();
                    return
                }
                else if (date !== "" && dateString < today) {

                    document.getElementById("eventMessage").innerHTML = "Please Enter the Valid Date";
                    showMsg();
                    return
                }
                else if (date !== "" && dateString > today) {
                    eventObj.time = time;
                }
                else {
                    document.getElementById("eventMessage").innerHTML = "Please Enter the Valid Time";
                    showMsg();
                    return
                }
               
                
            }
            else if (eventTime_hours == current_time_hours) {

                if (eventTime_minutes <= current_time_minutes) {

                    document.getElementById("eventMessage").innerHTML = "Please Enter the Valid Time";
                    showMsg();
                    return
                }
                else {
                    
                    eventObj.time = time;
                }
            }
            else {
                eventObj.time = time;
            }
            
        }
       

        if (date === "") {
            document.getElementById("eventMessage").innerHTML = "Please Enter the Event Date";
            showMsg();
            return
        }
        
        else if (date !== "" && dateString < today) {
            
            document.getElementById("eventMessage").innerHTML = "Please choose a valid date";
            showMsg();
            return
        }
        else {
            
            eventObj.date = date;
        }

        

        eventObj.joinedUserIds.push(uid);
        eventObj.users.push(currrent_user_displayName);
        eventObj.createdBy = uid;
        eventObj.username = currrent_user_displayName;


        // Validations
        

        var events = $firebaseArray(databaseRef);

        events.$add(eventObj).then(function (databaseRef) {

            var id = databaseRef.key;

            updateObject(id);

            // returns location in the array
        });
        function updateObject(refId) {

            eventObj.id = refId;
            databaseRef.child(refId).set(eventObj).then(function () {

                $(function () {

                    $("#eventMessage").text("Event has been Posted successfully");
                    setTimeout(function () {
                        $(function () {

                            $("#newEvent #newPost:first-child ul li#categoryLabel").append("<img id='newEventImage' src='../static/images/new.gif' />");
                        });
                        $("#eventMessage").slideDown();
                    }, 500)
                   
                    setTimeout(function () {

                        $(function () {

                            $("#newEvent #newPost:first-child ul li#categoryLabel img").remove();
                        });
                        $("#eventMessage").slideUp();
                    }, 4000)
                    
                   createdActivities();
                   
                });
               


            });

            



        }

    }

    function createdActivities() {

        $scope.showCreadtedActivities();

    }

    $scope.resetForm = function () {

        $(function () {
            $(".newEvent-description input,.newEvent-description textarea").val("");
            $(".newEvent-description select").val($(".newEvent-description select option:first").val());
            $("#eventMessage").text("The form has been reset");
            $("#eventMessage").slideDown();
            setTimeout(function () {
                $("#eventMessage").slideUp();
            }, 3000)
        });
    }
    //====================New Event Posting to database =======================//

    function showMsg() {

        $("#eventMessage").slideDown();
        setTimeout(function () {
            $("#eventMessage").slideUp();
        }, 3000)
    }

    //====================Edit Event ===================================//

    $scope.EditEvent = function (event) {
        

        $scope.myView = "newEventCreation";
        $scope.editPost = true;
        $scope.newPost = false;
        
        setTimeout(function () {
            
            document.getElementById('event-title').value = event.title;
            document.getElementById('event-description').value = event.description;
            document.getElementById('event-location').value = event.location;
            document.getElementById('event-time').value = event.time;
            document.getElementById('event-date').value = event.date;
            document.getElementById('event-category').value = event.category;
            document.getElementById('event-id').value = event.id;
            document.getElementById('users-registered').value = event.users;
            document.getElementById('createdBy').value = event.createdBy;
            document.getElementById('event-username').value = event.username;
            document.getElementById('event-joinedUserIds').value = event.joinedUserIds;
            

        }, 500)


        
    }

    $scope.saveEditedEvent = function () {

        var editedPost = {};

        editedPost.title = document.getElementById('event-title').value;
        editedPost.description = document.getElementById('event-description').value;
        editedPost.location = document.getElementById('event-location').value;
        editedPost.time = document.getElementById('event-time').value;
        editedPost.date = document.getElementById('event-date').value;
        editedPost.category = document.getElementById('event-category').value;
        editedPost.id = document.getElementById('event-id').value;
        editedPost.createdBy = document.getElementById('createdBy').value;
        editedPost.username = document.getElementById('event-username').value;
        editedPost.users = document.getElementById('users-registered').value.split(",");
        editedPost.joinedUserIds = document.getElementById('event-joinedUserIds').value.split(",");


       
        
        databaseRef.child(editedPost.id).set(editedPost).then(function () {

            //$scope.events = $firebaseArray(databaseRef);
            $(function () {

                $("#eventMessage").text("Event has been edited successfully");
                $("#eventMessage").slideDown();
                setTimeout(function () {
                    $("#eventMessage").slideUp();
                }, 3000)
            });



        });
       

    }


    //==================Edit Event ==================================//



    //===========================Event Deletion==============================//

    $scope.DeleteEvent = function ($event, event) {

        var userAcceptance = confirm("Want to delete?");
        if (userAcceptance) {
            //Logic to delete the item
            var events = $firebaseArray(databaseRef);

            $scope.events.$remove(event);

            
        }
        

        
    }

    //===========================Event Deletion==============================//



    //=======================Show created Events and new Event Creation =============================//
    $scope.showCreadtedActivities = function () {

        $scope.myView = "createdActivities";
        $scope.events = $firebaseArray(databaseRef);
       

    }

    $scope.showNewEventCreation = function () {

        $scope.editPost = false;
        $scope.newPost = true;
        $(function () {
            $(".newEvent-description input,.newEvent-description textarea").val("");
           $(".newEvent-description select").val($(".newEvent-description select option:first").val());
        })
        $scope.myView = "newEventCreation";
       

    }
    //=======================Show created Events and new Event Creation =============================//



    //===========================Trimmed Result && Interested Category ===========================//

    $scope.trimmedResult = function (eventTitle) {
    
        $(function () {

            $('.trimmedViewNoEventErrorMsg').show();
        });

        var databaseRefTrimResults = firebase.database().ref().child('Events');

       

        if (eventTitle != "Interested" && eventTitle != "all") {

            
            $scope.myView = "trimmedActivites";
            $scope.events = $firebaseArray(databaseRefTrimResults);
            
            $scope.myTitle = eventTitle;
           
        }
        else if (eventTitle == "all") {
            $scope.myView = "allActivites";
            $scope.events = $firebaseArray(databaseRefTrimResults);
        }
        else {
            
            // Interested Activities 
            $(function () {
                $("#profilePage").click(function () {

                    $("#homepage input").val(uid);
                    $("#homepage").submit();
                });
            })
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

        $scope.myView = "currentEventView";
        $scope.currentObjId = event.id;
        $scope.userCreatedEvent = false;
        
        var currentViewObject = eventsDB.child(event.createdBy);
        $scope.Events = $firebaseArray(currentViewObject);

        
        //Check for Joined Activity 
        if (event.createdBy == uid) {

            $scope.userCreatedEvent = true;
            $scope.joinUser = false;
        }
        else {

            joinedActivity(event);
        }
           
   
        //Check for Joined Activity 
       
       
        
       

        //=======================Limiting the registered Users====================== //

        viewLess();

        
        //=======================Limiting the registered Users====================== //


    }


    //============================Joined Activity Code Starts Here ======================//

    $scope.joinActivity = function (event) {
       
        
        var newEvent = angular.copy(event); //This is created to preserve the $$hashkey,$id,$priority property in the original object
       
        
        var id;
        if (event.$id) {
            id = event.$id;
        }
        else {
            id = event.id;
        }
        
        if (newEvent.joinedUserIds.indexOf(uid) === -1) {
            newEvent.joinedUserIds.push(uid);

        }
        if (newEvent.users.indexOf(currrent_user_displayName) === -1) {
            newEvent.users.push(currrent_user_displayName);
            
        }

        
        delete newEvent.$$hashKey;
        delete newEvent.$id;
        delete newEvent.$priority;

        eventsDB.child(event.createdBy).child(event.id).set(newEvent).then(function () {

            //$scope.events = $firebaseArray(databaseRef);
            $(function () {

                $("#eventMessage").text("You have successfully joined an Event");
                $("#eventMessage").slideDown();
                setTimeout(function () {
                    $("#eventMessage").slideUp();
                }, 3000)
            });

            joinedActivity(event);

        });

        


    }

    function joinedActivity(event) {

        var event = eventsDB.child(event.createdBy);
        var eventsJoined = $firebaseArray(event);


        var userId = [];


        eventsJoined.$loaded().then(function (eventsJoined) {

            angular.forEach(eventsJoined, function (value, index) {
                userId = value.joinedUserIds;

            })

            $scope.joinUser = true;

            if (userId.indexOf(uid) !== -1) {

                $scope.recordExist = true;
            }

            else {
                $scope.recordExist = false;
            }



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
        //Removing the perosn from the joined activites


        var newEvent = angular.copy(event);

        delete newEvent.$$hashKey;
        delete newEvent.$id;
        delete newEvent.$priority;


        if (newEvent.joinedUserIds.indexOf(uid) !== -1) {
            newEvent.joinedUserIds.splice(newEvent.joinedUserIds.indexOf(uid), 1);

        }
        if (newEvent.users.indexOf(currrent_user_displayName) !== -1) {
            newEvent.users.splice(newEvent.users.indexOf(currrent_user_displayName), 1);

        }
       

        eventsDB.child(event.createdBy).child(event.id).set(newEvent).then(function () {

            
            $(function () {

                $("#eventMessage").text("You have successfully opted out  an Event");
                $("#eventMessage").slideDown();
                setTimeout(function () {
                    $("#eventMessage").slideUp();
                }, 3000)
            });


            joinedActivity(event);
        });

       
    }

    $scope.showJoinedActivities = function () {

        $scope.myView = "joinedActivities";

        $scope.events = $firebaseArray(eventsDB);
        $scope.currentUsrId = uid;
        

        
    }

    //=============================Joined Activity Code Ends Here ========================//

    
        
        $scope.trimmedResult("all");



}]);


/* ================== Event Management ============================*/

$(document).ready(function () {


    var currentUser;

    //sign In and Sign Out recognition

    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            currentUser = user;
            
            
            firebase.database().ref('/user_profiles/' + uid).once('value').then(function (snapshot) {
                
                var username = snapshot.val().nickname;
                if (username) {
                    document.getElementById("username").innerHTML = username;
                }
                else {
                    document.getElementById("username").innerHTML = user.displayName;
                }
            }).catch(function (error) {

                document.getElementById("username").innerHTML = user.displayName;

            });


            

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
   


    $(".activity #profile_picture,.activity #profile-name, .profile").on('click', function () {

       
        $("#homepage input").val(uid);
        $("#homepage").submit();


    });


    


    //$(".left-nav-list p").on('click', function () {

    //    $(this).parent().siblings('div.left-nav-list').find('ul').hide('slow');
    //    $(this).siblings('ul').show('slow');

    //});

    $(".left-nav-list ul li:first-child").css('color', '#000');
    $(".left-nav-list ul li").on('click', function () {

        $(this).parents('.left-nav-list').siblings('div.left-nav-list').find('li').css('color', '#fff');
        $(this).siblings().css("color", "#fff");
        $(this).css("color","#000");
    });

});



//==========Show all registerd Users =========//
//function viewAll() {

//    $(function () {

//        $(".registeredUsers ul li").each(function () {

//            $(this).show();

//        });
//        $(".registeredUsers ul:last-child").append('<li onClick="viewLess()"  class="viewUsers" id="viewLessUsers">view less</li>');
//        $(".registeredUsers #viewAllUsers").remove();
//    });
//}


//function viewLess() {

//    $(function () {

//        var limit = 2;
//        var i = 0;
//        var viewLimitExceeds = false;

//        $(".registeredUsers ul li").each(function () {

//            if (i <= limit) {
//                $(this).show();
//                i++;
//            }
//            else {
//                $(this).hide();
//                viewLimitExceeds = true;
//            }

//        });

//        if (viewLimitExceeds == true) {
//            $(".registeredUsers ul:last-child").append('<li onClick="viewAll()"  class="viewUsers" id="viewAllUsers">view all registered Users</li>');
//            $(".registeredUsers #viewLessUsers").remove();
//        }

//    });

//}
//==========Show all registerd Users =========//





