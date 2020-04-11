<?php

$recepient = "";
$sitename = "Studio Красоты";

$name = trim($_POST["yourFirstName"]);
$phone = trim($_POST["yourPhone"]);
$email = trim($_POST["yourEmail"]);

$pagetitle = "Новая заявка с сайта \"$sitename\"";
$message = "Имя: $name \nТелефон: $phone\nEmail: $email";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
if ( mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient") ) 
    echo "ok";
?>