

$("#GetProfile").click(function () {
	if (sessionStorage.getItem("accessToken") == null) {
		window.location.href = "../Register.html";
	}
	show_loader();
	var lang = $("#language").val();
	$.ajax({
		type: "GET",
		url: "/api/account/getprofile",
		contentType: "application/json",
		data: { "language": lang },
		headers: {
			"Authorization": "Bearer " + sessionStorage.getItem("accessToken")
		},

		success: function (data) {
			$("#divdata").removeClass("hidden");

			$("#address").text(data.Address);
			$("#email").text(data.Email);
			$("#phone").text(data.Phone);
			hide_loader();
		},
		error: function (jqXHR) {
			if (jqXHR.status == "401") {
				$("#replog").removeClass("hidden");
            }
				
			$("#errdiv").removeClass("hidden");
			$("#err").text(jqXHR.responseText);
			$("#divdata").addClass("hidden");
			hide_loader();
		}


	})


})

$("#replog").click(function () {

	sessionStorage.removeItem("accessToken");
	window.location.href = "../Register.html";

})


function show_loader() {
	$("#loader").addClass("loader");
	//event.preventDefault();
}

function hide_loader() {
	$("#loader").removeClass("loader");
	//event.preventDefault();
}

