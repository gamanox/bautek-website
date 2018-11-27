<?php

$mailTo = $_POST['emailTo'];
$mailFrom = $_POST['emailFrom'];
$cellPhone = $_POST['cellPhone'];
$subject = $_POST['subject'];
$message = $_POST['message'];


mail($mailTo, $subject, $message." Mi celular es: ".$cellPhone, "De: ".$mailFrom);
?>