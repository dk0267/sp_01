
// Get the login modal
var modalLogin = document.getElementById('modalLogin');
var stateText = document.getElementById('state');
var modalUpload = document.getElementById('modalUpload');
var loginLink = document.getElementById('loginLink');
var textFile = readTextFile('settings');

//img root
var img_root_dir = 'images/';

//console.log(text_file);
init(textFile);

//initial function to set values of my files inside html
function init(settings)
{
	var lines = settings.split('\n');
	for(var i = 0;i < lines.length;i++)
	{
    //code here using lines[i] which will give you each line
		if (i > 2)
		{
			//console.log(lines[i]);
			var tmp_img = document.getElementById('img'+(i-2).toString());
			var tmp_text = document.getElementById('text'+(i-2).toString());
			var tmp_link = document.getElementById('link'+(i-2).toString());
			
			//tmp_text.textContent = lines[i];
			
			//get data
			var temp_data = lines[i].split(';');
			
			if (typeof temp_data[4] != 'undefined')
			{
			
			
			if (temp_data[1] != '')
			{//set link to file
				tmp_link.href = temp_data[1];
			}
			
			if (temp_data[0] != '')
			{//set text
				tmp_text.textContent = temp_data[0];
			}
			
			if (temp_data[3] != '')
			{
				tmp_text.textContent = tmp_text.textContent + " | " + temp_data[3];
			}
			
			if ( temp_data[4] != '')
			{
				tmp_text.textContent = tmp_text.textContent + " | " + temp_data[4];
			}
			
			if (temp_data[2] != '' )
			{//set link to file
				
				if (temp_data[2] == 'pdf')
					tmp_img.src = img_root_dir+"dokument_slika_pdf.png";
				else if (temp_data[2] == 'doc' || temp_data[2] == 'docx')
					tmp_img.src = img_root_dir+"dokument_slika.jpg";
				else if (temp_data[2] == 'xlsx' || temp_data[2] == 'xls')
					tmp_img.src = img_root_dir+"dokument_slika_xsl.png";
				else if (temp_data[2] == 'jpg' || temp_data[2] == 'png' || temp_data[2] == 'gif')
					tmp_img.src = temp_data[1];
				else
					tmp_img.src = img_root_dir+"dokument_slika.jpg";
			}
			
			
			}
			
		}
	}
}



//clicked outside modal window closes the modal window
window.onclick = function(event) 
{
    if (event.target == modalLogin) {
        hide('Login');
    }
	
	if (event.target == modalUpload) {
        hide('Upload');
    }
	
}


//hide show modal windows
function hide(modalName)
{
	document.getElementById('modal'+ modalName).style.display = "none";
}

function show(modalName)
{
	//only show when user is logged in
	if (modalName == 'Upload' && stateText.innerText == "You're not signed in!")
		alert('If you want to upload, you must log in first!');
	else if (modalName == 'Login' && stateText.innerText == "Signed in as admin")//if user is already logged in we must log him out
		logout();
	else
		document.getElementById('modal'+ modalName).style.display = "block";
}


//successfully logged in
function login()
{
	stateText.innerText = "Signed in as admin";
	//log the user in change the login link to log out, and hide the modal
	loginLink.innerText = "Sign out";
	hide("Login");
}

//successfully logged out
function logout()
{
	stateText.innerText = "You're not signed in!";
	//log the user in change the login link to log out, and hide the modal
	loginLink.innerText = "Sign in";
	//hide("Login");
}


//form validations
function validateLoginForm() 
{
    var uname = document.forms["loginForm"]["fname"].value;
	var pass = document.forms["loginForm"]["fpass"].value;
    if (uname == "") {
        alert("Username must be filled out");
        return false;
    }
	
	var unameRegex = /^[a-zA-Z0-9]+$/;
	var validUsername = uname.match(unameRegex);
    if(validUsername == null){
        alert("Your first name is not valid. Only characters A-Z, a-z and '-' are  acceptable.");
        return false;
    }
	
	if (pass == "") {
        alert("Password must be filled out");
        return false;
    }
	
	if (uname != "admin" || pass != "admin") {
        alert("Incorrect username or password");
        return false;
    }
	
	
	alert("Welcome "+uname+".");
	
	
	
	return true;
	
}

function validateUploadForm() 
{
	var comment = document.forms["loginForm"]["fcomment"].value;
	var date = document.forms["loginForm"]["fdate"].value;
	if (date == "") {
        alert("Date must be filled out");
        return false;
    }
	
	var dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
	//flipped version of yyyy/mm/dd
	var validDate = date.match(dateRegex);
    if(validDate == null){
        alert("Your date is not valid. Only date formats DD/MM/YYYY or DD-MM/YYYY.");
        return false;
    }
	
	
	return true;
}


//reading my settings file using an sync request, horror of pains
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
	//get my file
	var readText = "hey im emtpy";
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                readText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
	return readText;
}