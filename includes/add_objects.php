<?php 
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_POST['val'])){    if($_POST['val'] == '1')    {
        $title = $_POST['title'];
        $author_id = $_POST['author_id'];
        $type_id = $_POST['type_id'];        $price = $_POST['price'];
        $publisher_id = $_POST['publisher_id'];        $amount = $_POST['amount'];

        $query="INSERT INTO books(title,author_id,type_id,price,publisher_id,amount)  VALUES ('$title', '$author_id', '$type_id', '$price', '$publisher_id', '$amount')";
    }    if($_POST['val'] == '2')    {
        $lastname = $_POST['lastname'];
        $firstname = $_POST['firstname'];
        $description = $_POST['description'];        $city = $_POST['city'];
        $country = $_POST['country'];

        $query="INSERT INTO authors(lastname,firstname,description,city,country)  VALUES ('$lastname', '$firstname', '$description', '$city', '$country')";
    }    if($_POST['val'] == '3')    {
        $name = $_POST['name'];
        $city = $_POST['city'];
        $country = $_POST['country'];
        $query="INSERT INTO publishers(name,city,country)  VALUES ('$name', '$city', '$country')";
    }    if($_POST['val'] == '4')    {
        $name = $_POST['name'];
        $query="INSERT INTO type(name)  VALUES ('$name')";
    }    if($_POST['val'] == '5')    {
        $lastname = $_POST['lastname'];
        $firstname = $_POST['firstname'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $query="INSERT INTO customers(lastname,firstname,email,phone)  VALUES ('$lastname', '$firstname', '$email', '$phone')";
    }    if($_POST['val'] == '6')    {
        $customer_id = $_POST['customer_id'];
        $book_id = $_POST['book_id'];
        $amount = $_POST['amount'];        $data_order = $_POST['data_order'];
        $query="INSERT INTO shopcart(customer_id,book_id,amount,data_order)  VALUES ('$customer_id', '$book_id', '$amount', '$data_order')";
    }
   
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    //$result = $mysqli->affected_rows;
    echo $json_response = json_encode($result);
}
?>