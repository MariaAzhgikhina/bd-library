<?php 
$DB_HOST = 'localhost';
$DB_USER = 'root';
$DB_PASS = '123456';
$DB_NAME = 'db_books';
$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME) or die       ('Невозможно открыть базу');
?>