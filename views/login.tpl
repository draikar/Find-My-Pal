<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="/static/content/style.css" />
  <title>Find My Pal</title>
</head>

<!-- Script Files-->

  
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
 <script src="https://www.gstatic.com/firebasejs/3.1.0/firebase.js"></script>
 <script type="text/javascript" src="../static/scripts/Project/login.js"></script>
 

<!-- End of Script-->



<body>
<div class="parent-div">

<!-- Main Home Page Contents Starts here -->

	<div class="errorMsg" id="login_error"> Oops!!! Login Failed. Please try again </div>

	<div class="login-main">

		<!--Home Page Contents (Image, Title and caption) -->

			<img id="logo" src="/static/images/friends.jpg" />

			<div class="info">
				<p> FIND MY PAL </p>
				<p> Friends with similar interests found here </p>
			</div>

		<!--Home Page Contents Ends here -->


		<!-- Sign In with Google Logo and Button -->

				<div id="signin-google">
					<img src="/static/images/google.png" />
					<p> Sign in with Google </p>

				</div>

		<!-- Sign In with Google Logo and Button -->

	</div>

<!-- Main Home Page Contents Ends here -->



<!-- Receving Data about the user from the google Sign and Processing the request starts here -->

	<!-- Forwarding to profile Page upon successful login-->

		<form action = "/activity" id="homepage">

			<input type="hidden" name = "user_id">

		</form>

	<!-- Ends Here-->





<!-- Receving Data about the user from the google Sign and Processing the request Ends here -->


</div>


</body>
</html>