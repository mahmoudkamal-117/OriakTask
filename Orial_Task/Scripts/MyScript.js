const signUpButton = document.getElementById('signUp');
const RegisterButton = document.getElementById('Register');

const signInButton = document.getElementById('signIn');
const LogInButton = document.getElementById('Login');
const container = document.getElementById('container');

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

RegisterButton.addEventListener('click', (e) => {

	show_loader();

	e.stopImmediatePropagation();
	e.preventDefault();


	var isValid;
	$(".req").each(function () {
		var element = $(this);
		if (element.val() == "") {
			isValid = false;
		}
	});
	if (isValid == false) {
		$("#MessageR").removeClass("hidden");
		$("#MessageTextR").text("you must enter all fields");
		hide_loader();
	}

	else {
		var model = new Object();
		model.Email = $("#email").val();
		model.Password = $("#password").val();
		model.ConfirmPassword = $("#ConfirmPassword").val();
		model.ArAddress = $("#ArAddress").val();
		model.EnAddress = $("#EnAddress").val();
		model.PhoneNumber = $("#PhoneNumber").val();
		
		$.ajax({
			type: "POST",
			url:"api/account/register",			
			data: model ,
			
			success: function () {
				$("#MessageR").removeClass("hidden");
				$("#MessageTextR").text("Registerd successfully");
				console.log("suc");
				container.classList.remove("right-panel-active");
				hide_loader();
			},
			error: function (jqXHR) {
				$("#MessageR").removeClass("hidden");
				$("#MessageTextR").text(jqXHR.responseText);
				console.log("err");
				hide_loader();
			}


		})


	}


	hide_loader();


	
});






$(document).ready(function () {


	LogInButton.addEventListener('click', (e) => {
		show_loader();
		e.stopImmediatePropagation();
		e.preventDefault();

		var isValid;
		$(".reqlog").each(function () {
			var element = $(this);
			if (element.val() == "") {
				isValid = false;
			}
		});
		if (isValid == false) {
			$("#MessageR").removeClass("hidden");
			$("#MessageTextR").text("you must enter all fields");
			
			hide_loader();
			return false;
		}
		else {

			$.ajax({
				method: "POST",
				url: "/token",
				//contentType: "application/json",
				data: {
					username: $("#logusername").val(),
					password: $("#logpassword").val(),
					grant_type: "password"
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				success: function (response) {
					//$("#MessageR").removeClass("hidden");
					//$("#MessageTextR").text(JSON.stringify(response));
					debugger
					sessionStorage.setItem("accessToken", response.access_token)
					sessionStorage.setItem('userName', response.userName);
					
					//hide_loader();

					window.location.href = "Home/Index";
				},
				error: function (jqXHR) {
					$("#MessageR").removeClass("hidden");
					$("#MessageTextR").text(jqXHR.responseText);
					
					hide_loader();
				}


			})


		}
		hide_loader();





	});


})



function show_loader() {
	$("#loader").addClass("loader");
	//event.preventDefault();
}

function hide_loader() {
	$("#loader").removeClass("loader");
	//event.preventDefault();
}