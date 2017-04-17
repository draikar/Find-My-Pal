<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="../static/content/style.css" />
  <title>Find My Pal</title>
</head>

<!-- Script Files-->

 
 <script src="https://www.gstatic.com/firebasejs/3.1.0/firebase.js"></script>
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
 <script type="text/javascript" src="../static/scripts/project/registration.js"></script>

<!-- End of Script-->




<body>
<div class="parent-div">

<!-- Main Home Page Contents Starts here -->

	<div class="msg" id="login_error"> Oops!!! Something Went Wrong </div>
	<div  class="msg success" id="success"> User has been Successfully registered!!! Please Login </div>

	<div class="app_info"> 

		<!--Home Page Contents (Image, Title and caption) -->

			<img id="logo" src="../static/images/friends.jpg" />

			<div class="info"> 
				<p> FIND MY PAL </p> 
				<p> Friends with similar interests found here </p>
			</div>

		<!--Home Page Contents Ends here -->

	</div> 


	<div class="register_content">
		

		<!-- Login  -->

			<form  class= "register_form" id="registerForm" action="/login">
			
			<p> Create an Account</p>
			

			<input type="text" id="username" placeholder="Enter user name" autocomplete="off"  /> <br />
			
			<input type="email" id="email" placeholder="Enter user your email" autocomplete="off"  /> <br />

			<input type="text" id="password" placeholder= "Enter password" autocomplete="off"  /> <br />

			<input type="password" id="confirm_password" placeholder="Confirm Your Password" autocomplete="off"  /> <br />
			<input type="button" class="submit" value ="Register" />
			
			<br>
			<a href="login" class="back_home"><button>Back to Login</button></a>
			
			
			
		 </form> 
				

		<!-- End of Login -->
	
	
	</div>

<!-- Main Home Page Contents Ends here -->



<!-- Receving Data about the user from the google Sign and Processing the request starts here -->

	<!-- Forwarding to profile Page upon successful login-->

		<form action = "/profile" id="homepage">

			<input type="hidden" name = "uid">

		</form>

	<!-- Ends Here-->

	



<!-- Receving Data about the user from the google Sign and Processing the request Ends here --> 


</div>


</body>
</html>