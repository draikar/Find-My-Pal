<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="../static/content/style.css" />
  <title>Find My Pal</title>
</head>

<!-- Script Files-->

 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
 <script src="https://www.gstatic.com/firebasejs/3.1.0/firebase.js"></script>


<!-- End of Script-->

<script>

var url = "http://localhost/project/profile.html"

    var config = {
        apiKey: "AIzaSyAX7XWqC8CVJIg9Ug2yBnp7n9ozrBGWqmU",
        authDomain: "testlogin-af998.firebaseapp.com",
        databaseURL: "https://testlogin-af998.firebaseio.com",
        storageBucket: "testlogin-af998.appspot.com",
        messagingSenderId: "197140774777"
    };

    firebase.initializeApp(config);

	
	function resendEmail() {

		
		firebase.auth().onAuthStateChanged(function (user) {
       
			if (user) {
            
				user.sendEmailVerification();
				$(function(){
				
					$(".confirmation_msg").show();
				});

			}
			else {
				console.log('error');
			}
		});
	}

	<!-- Checking Email confirmation --> 

	function check_email_conformation() {

	
		
		firebase.auth().onAuthStateChanged(function (user) { 
				
		
			if(user.emailVerified) {
				
				document.getElementById('uid').value = user.uid;
				document.getElementById("profile_form").submit();
				
				
			}
		
		});

	}

	setInterval(function() {
                  window.location.reload();
				 check_email_conformation();
                }, 5000); 

	



</script>

<body>
<div class="parent-div">

<!-- Main Home Page Contents Starts here -->

	

	<div class="login-main"> 

		<!--Home Page Contents (Image, Title and caption) -->

			<img id="logo" src="../static/images/friends.jpg" />

			<div class="info"> 
				<p> FIND MY PAL </p> 
				<p> Please confirm the Email Address sent to your Inbox.</p>
				<button class="resend_button" onclick="resendEmail()"> Resend Confirmation email </button> <br>

				<div class="confirmation_msg"> 
					<span> Verification email has been sent.</span> 
					 <a target="_blank" href ="https://accounts.google.com/ServiceLogin?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&sacu=1&rip=1#identifier" > Please click here to Verify </a>
				 </div>

			</div>

		<!--Home Page Contents Ends here -->

		
		<form id="profile_form" action="/profile">
		 
			<input type="hidden" id="uid" name="uid" />
		
		
		</form>

		
		

	</div> 

<!-- Main Home Page Contents Ends here -->


</div>


</body>
</html>