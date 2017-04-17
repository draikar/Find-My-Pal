
//Firebase Configuration Object
var config = {
    apiKey: "AIzaSyD8_nEsadS4xowGxBSAzipb5r1uqRiu6V4",
    authDomain: "dev-findmypal.firebaseapp.com",
    databaseURL: "https://dev-findmypal.firebaseio.com",
    projectId: "dev-findmypal",
    storageBucket: "dev-findmypal.appspot.com",
    messagingSenderId: "116241201934"
};

firebase.initializeApp(config);





$(function () {

    var confirm_pass = false;
    var unique_username = false;

    $("#login_error").hide();
    $("#success").hide();

    // Checking for Password Confirmation match
    $("#confirm_password").keyup(function () {

        

        if ($(this).val() !== $("#password").val()) {

            $(this).css('border', '1px solid red');
        }
        else {
            confirm_pass = true;
            $(this).css('border', 'none');
        }

    });

    //Check Unique Username

    $("#username").keyup(function () {
        
        var user_name = document.getElementById("username").value;

        if (user_name != "") {
            

            firebase.database().ref('/user_profile').orderByChild("username").equalTo(user_name).once("value", function (snapshot) {
               
                if (snapshot.val()) {
                    
                    $("#login_error").text("Username already exists. Please choose another username");
                    $("#login_error").slideDown();

                    setTimeout(function () {
                        $("#login_error").slideUp();
                    }, 3000)
                    unique_username = false;

                }
                else {
                    
                    unique_username = true;
                }
            });
        }
        
       

    });

   




    //user registration

    $(".submit").click(function(){
    
        

        var email = document.getElementById("email").value;
        var user_name = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var register_status = true;
        var domain = "kent.edu"
        
        if (email !== "" && password !== "" && confirm_pass == true && unique_username == true) {

            var user_domain = email.split("@");

            if (user_domain[1] == domain) {

                firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {

                    
                    var user = firebase.auth().currentUser;
                   
                    // Storing the user Information in database

                    function writeUserData(userId, user_name, email) {
                        firebase.database().ref('user_profile/' + userId).set({
                            username: user_name,
                            email: email,
                            
                            
                        });
                       
                    }

                    writeUserData(user.uid, user_name, email);

                   

                   
                    // Ends here

                    user.sendEmailVerification();
                    $("#success").slideDown();
                    setTimeout(function () {
                        $("#registerForm").submit();
                    }, 3000)



                }).catch(function (error) {

                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    register_status = false;
                   

                    // ...

                    if (errorCode == "auth/email-already-in-use") {
                        $("#login_error").text("Oops!!! User Already Exists. Please try logging in");
                        $("#registerForm input:not(.submit)").val("");


                    }
                    $(function () {
                        $("#login_error").text(error.message);
                        $("#login_error").slideDown();
                        $("#registerForm input:not(.submit)").val("");
                        setTimeout(function () {
                            $("#login_error").slideUp();
                        }, 6000)
                    });


                });


            }
            else {

                $("#login_error").text("Please register with Kent State Email Id");
                $("#login_error").slideDown();
                $("#registerForm input:not(.submit)").val("");
                setTimeout(function () {
                    $("#login_error").slideUp();
                }, 6000)
            }
           

            

        } else {
            $("#login_error").text("Please fill the form and try again");
            $("#login_error").slideDown();
            setTimeout(function () {
                $("#login_error").slideUp();
            }, 6000)
        }

        
    
    });

       



    

});