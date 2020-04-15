<?php
	//id13291320_dbprojet
	//id13291320_user
	//4M^N()MWUQ6!9UNx
	try {
		$dbh = new PDO('mysql:host=localhost;dbname=id13291320_dbprojet', 'id13291320_user', 'ThisIsA_Password12',array(\PDO::MYSQL_ATTR_INIT_COMMAND =>  'SET NAMES utf8'));
	} catch (PDOException $e) {
		echo "MySQL connection error.";
		echo 'Exception reçue : ',  $e->getMessage(), "\n";
		exit();
	}

	if (isset($_REQUEST['username']) && isset($_REQUEST['password'])) {
		$stmt = $dbh->query("SELECT password FROM comptes WHERE username=".($dbh->quote($_REQUEST['username'])));
		$row = $stmt->fetch();
		if (password_verify($_REQUEST['password'],$row['password'])) {
			echo "Réussi";
			exit();
		} else {
			echo "Echoué";
			exit();
		}
	} else {
		echo 'Bad Request.';
	}
/*

CREATE TABLE comptes (
	username VARCHAR(200) PRIMARY KEY,
	password VARCHAR(200)
)

CREATE TABLE evenement (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    string TEXT,
    dateE VARCHAR(50),
    lieu VARCHAR(50)
)

CREATE TABLE participe (
	username VARCHAR(200),
    idE INT,
    CONSTRAINT FK_utilisateur FOREIGN KEY (username) REFERENCES comptes(username),
    CONSTRAINT FK_ide FOREIGN KEY (idE) REFERENCES evenement(id),
    PRIMARY KEY (username,idE)
)

*/


?>

