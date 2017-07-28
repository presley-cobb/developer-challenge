//Triggers on modal click
$('#CTLmodal').click(function(evt){
			//If there is something in the email or phone box continue
			if($('#email').val() != "" || $('#phoneNumber').val() != ""){
				var email = $('#email').val();
				var phone = $('#phoneNumber').val();
					//If you click outside of the email or phone box continue
					if(evt.target.id != 'email' || evt.target.id != 'phoneNumber'){
						//Sends email and phone values to php
						$.post(
							'validate.php',
							{email:email,
							phone:phone},
							function(data){
								//Checks if the email was valid, if the error message already exist and if there is a value throw an error against
								if(!data["email"] && !$('#emailerror').length && $('#email').val().length){
									$('#email').after('<p id="emailerror">Please enter a valid email</p>');
								}
								//remove error once validation passes
								if(data["email"] == true){
									$('#emailerror').remove();
								}
								//Checks if the phone was valid, if the error message already exist and if there is a value throw an error against
								if(!data["phone"] && !$('#phoneerror').length && $('#phoneNumber').val().length){
									$('#phoneNumber').after('<p id="phoneerror">Please enter a valid phone number</p>');
								}
								//remove error once validation passes
								if(data["phone"] == true){
									$('#phoneerror').remove();
								}
							},
							"json"
							);
					}
			}
});

$('#submit').click(function(evt){
	var phoneError = $('#phoneerror').length;
	var emailError = $('#emailerror').length;
	var phoneNumberLength = $('#phoneNumber').val().length;
	var emailLength = $('#email').val().length;
	if(phoneError || emailError || phoneNumberLength === 0 || emailLength === 0){
		evt.preventDefault();
	}
})