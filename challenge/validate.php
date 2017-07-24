<?php
class Validate {
	//prints out response javascript grabs
	public static function respond(){
		$response = array("email"=> self::emailValidate(), "phone" => !self::phoneValidate());
		print_r(json_encode($response));
	}
	//Validates email
	public static function emailValidate(){
		if(isset($_POST['email'])){
			$match = preg_match('/[a-z][a-z\-\.]*@[a-z\-]{2,}\.[a-z]{2,}/i', $_POST['email']);
			//converts result to boolean
			return $match == 0 ? false : true;
		}
	}
	//Validates phone number
	public static function phoneValidate(){
		$illegal = false;
		if(isset($_POST['phone'])){
			$too_small = strlen($_POST['phone']) < 10;
			$too_large = strlen($_POST['phone']) > 15;
			//checks for leading repeating numbers
			$match = preg_match('/\A(\d)\1\1/', $_POST['phone']);
			//converts result to boolean
			$match = $match == 0 ? false : true;
			//grabs json and decodes it for use in php
			$json = json_decode(file_get_contents('js/illegal.json'), true);
			//loops through json to see if phone numbers match illegal numbers
				for($i=0; $i < count($json['Illegal_Numbers']); $i++){
					//If this condition is passed illegal number was found
					if($_POST['phone'] == $json['Illegal_Numbers'][$i]){
						$illegal = true;
					}
				}
				//returns false if the phone number is legal
				return $match || $illegal || $too_small || $too_large;
		}
	}
}
//Runs response
Validate::respond();
?>