<?php
	 
	try {
		$dbh = new PDO('mysql:host=localhost;dbname=id13291320_dbprojet', 'id13291320_user', 'ThisIsA_Password12',array(\PDO::MYSQL_ATTR_INIT_COMMAND =>  'SET NAMES utf8'));
	} catch (PDOException $e) {
		echo "MySQL connection error.";
		echo 'Exception reçue : ',  $e->getMessage(), "\n";
		exit();
	}

	if (isset($_REQUEST['username']) && isset($_REQUEST['password'])) {
		$stmt = $dbh->query("SELECT count(*) as nb FROM comptes WHERE username=".($dbh->quote($_REQUEST['username'])));
		$row = $stmt->fetch();
		if ($row['nb']) {
			echo 'Existe déjà';
			exit();
		} else {
			$stmt = $dbh->prepare("INSERT INTO comptes (username, password) VALUES (?, ?)");
			$stmt->bindParam(1, $username);
			$stmt->bindParam(2, $password);
			$username = $_REQUEST['username'];
			$options = [
			    'cost' => 10,
			];
			$password = password_hash($_REQUEST['password'], PASSWORD_BCRYPT, $options);
			$stmt->execute();
			echo 'Compte créé';
			exit();
		}
	} else {
		echo 'Bad Request.';
	}
?>