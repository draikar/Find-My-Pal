// Initialize Firebase


$(document).ready(function () {

    var domain = "kent.edu";
    var url = "http://localhost/project/profile.html"

    var config = {
        apiKey: "AIzaSyD8_nEsadS4xowGxBSAzipb5r1uqRiu6V4",
        authDomain: "dev-findmypal.firebaseapp.com",
        databaseURL: "https://dev-findmypal.firebaseio.com",
        projectId: "dev-findmypal",
        storageBucket: "dev-findmypal.appspot.com",
        messagingSenderId: "116241201934"
    };

    firebase.initializeApp(config);

    

    // App sign in function


    $("#signin").click(function () {

        var email = $("#email").val();
        var password = $("#password").val();


        if (!email || !password) {
            return console.log('email and password required');
        }
        // Sign in user
        firebase.auth().signInWithEmailAndPassword(email, password)
          .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log('signIn error', error);
              // ...
          });
    })




    // AppRegister Function




    //Sign in with Google

    $("#signin-google").click(function () {

        

        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');


        return firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            var uid = user.uid;

            var user_domain = user.email.split("@");

            if (user_domain[1] == domain) {

                $("#homepage input").val(uid);
                $("#homepage").submit();

            }
            else {

                firebase.auth().signOut();
                $("#login_error").show("slow");



            }
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    })



    firebase.auth().onAuthStateChanged(function (user) {

        console.log('user', user);
    });
    //Sign out


});