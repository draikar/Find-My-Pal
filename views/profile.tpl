<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <title>Profile Info</title>
	
	<link rel="stylesheet" href="../static/content/style.css" />
	
	
<!-- Script Files-->


 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
   <script src="https://www.gstatic.com/firebasejs/3.1.0/firebase.js"></script>
 <script type="text/javascript" src="../static/scripts/Project/profile.js"></script>
 

<!-- End of Script-->


</head>
<body class="profile">
<header> 
		<div class="header">
			<img  id="site-logo" src="../static/images/friends.jpg"></img>
			<label>FindMyPal</label>
			<ul>
				<li id="activityPage"> Home </li>
				<li id="logout"><a href="/">Sign Out</a></li>
		
			</ul>

		</div>

</header>
<div id="profilePic">
	
	<div class="success-msg">
		<p id="profilePageMsg"> Your Profile has been Updated!!! </p>
	</div>
	<div class="basic-info">
		<p> Hello <span id="username"> </span></p>
		<img id="profile_picture"></img>
		<label for="update_pic" class="update_pic"> Update Your Profile Picture</label>
		<input type="file" id="update_pic"> </input>
	</div>
	<div class="profile-info">
		<input type="text" placeholder="FirstName" id="firstname"/>
		<input type="text" placeholder="MiddleName" id="middlename"/>
		<input type="text" placeholder="LastName" id="lastname"/>
		<br>
		<input type="text" placeholder="Nickname" id="nickname"/>
		<br>
		<select id="gender">
			<option>Choose Gender</option>
			<option>Male</option>
			<option>Female</option>
			<option>Prefer not to specify</option>
		</select>
		<br>
		<br>
		<div class="user-education-level">
			<Label>
			Education Level
			</Label> <br>

			<input type="radio" name="education-level" value="UnderGraduate">UnderGraudate</input>
			<input type="radio" name="education-level" value="Graduate">Graduate</input>
			<input type="radio" name="education-level" value = "PhD">PhD</input>

		</div>
		<br>

		<div class="user-education-year">
			<Label>
			Education Year
			</Label>
			<br>
			<input type="radio" name="education-year" value="Freshman">Freshman</input>
			<input type="radio" name="education-year" value="Sophomore">Sophomore</input>
			<input type="radio" name="education-year" value = "Junior">Junior</input>
			<input type="radio" name="education-year" value = "Senior">Senior</input>
			<input type="radio" name="education-year" value = "Other">Other</input>
			<!--<input type="text" id="other-edu-year" placeholder="Please specify the category" />-->
		</div>
		<br>
		<div class="user-interested-category">
			<Label>
			Interested Category
			</Label>
			<br>
			<label>Library</label><input type="checkbox" name="interested-category" value = "Library"></input>
			<label>Sports</label><input type="checkbox" name="interested-category" value="Sports"></input>
			<label>Rec Center</label><input type="checkbox" name="interested-category" value="RecCenter"></input><br>
			<label>Pool</label><input type="checkbox" name="interested-category" value="Pool"></input>
			<label>Movies</label><input type="checkbox" name="interested-category" value="Movies"></input>
			<label>Other</label><input type="checkbox" name="interested-category" value="Other"></input>
		
		</div>
		
		<br>
		<br>
		<input type="submit" id="update_profile" value="Save changes">
	</div>


	<!-- Forwarding to Activity Page -->
		<form action = "/activity" id="homepage">

			<input type="hidden" name = "user_id">

		</form>

	<!-- Forwarding to Activity Page -->



</div>
</body>
</html>
