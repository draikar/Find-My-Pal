// Initialize Firebase


$(document).ready(function () {

   

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


    $(".submit").click(function () {
        var email = $("#user_email").val();
        var password = $("#user_password").val();
        var domain = "kent.edu"

        if (email !== "" && password !== "") {

            var user_domain = email.split("@");

            if (user_domain[1] == domain) {

                 firebase.auth().signInWithEmailAndPassword(email, password)

                    .then(function (user) {

                        var uid = user.uid;
                        $(".login_form input[type='hidden']").val(uid);

                        if (user.emailVerified) {


                            document.getElementById('loginForm').setAttribute('action', '/profile');
                            $(".login_form").submit();


                        }
                        else {
                            document.getElementById('loginForm').setAttribute('action', '/emailConfirmation');
                            $(".login_form").submit();
                        }



                    })
                    .catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        $("#login_error").text(error.message);
                        $("#login_error").slideDown();
                       
                        setTimeout(function () {
                            $("#login_error").slideUp();
                        }, 6000)
                        // ...
                    });
            }
            else {
                $("#login_error").text("Try logging in with Kent Email Address");
                $("#login_error").slideDown();

                setTimeout(function () {
                    $("#login_error").slideUp();
                }, 6000)


            }
        }
        else {
            $("#login_error").text("Please fill the form and try again");
            $("#login_error").slideDown();

            setTimeout(function () {
                $("#login_error").slideUp();
            }, 6000)
        }

        
    });
    

    $("#frgt_pass_link").click(function () {

        //logic for forgetPassword Starts here
        

    });

   
});