<?php 
require_once '../includes/db.php'; // The mysql database connection scriptif(isset($_POST['val'])){    if($_POST['val'] == '1')    {
        $id = $_POST['id'];
        $title = $_POST['title'];
        $author_id = $_POST['author_id'];
        $type_id = $_POST['type_id'];        $price = $_POST['price'];
        $publisher_id = $_POST['publisher_id'];        $amount = $_POST['amount'];
        $query="update books set title='$title',author_id='$author_id',type_id='$type_id',price='$price', publisher_id='$publisher_id',amount='$amount'         where id='$id'";
    }    if($_POST['val'] == '2')    {
        $id = $_POST['id'];
        $lastname = $_POST['lastname'];
        $firstname = $_POST['firstname'];
        $description = $_POST['description'];        $city = $_POST['city'];
        $country = $_POST['country'];
        $query="update authors set lastname='$lastname',firstname='$firstname',description='$description',city='$city', country='$country'         where id='$id'";
    }    if($_POST['val'] == '3')    {
        $id = $_POST['id'];
        $name = $_POST['name'];
        $city = $_POST['city'];
        $country = $_POST['country'];
        $query="update publishers set name='$name',city='$city',country='$country'         where id='$id'";
    }    if($_POST['val'] == '4')    {
        $id = $_POST['id'];
        $name = $_POST['name'];
       
        $query="update type set name='$name' where id='$id'";
    }    if($_POST['val'] == '5')    {
        $id = $_POST['id'];
        $lastname = $_POST['lastname'];
        $firstname = $_POST['firstname'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $query="update customers set lastname='$lastname',firstname='$firstname',email='$email', phone='$phone'         where id='$id'";
    }        if($_POST['val'] == '6')    {
        $id = $_POST['id'];    
        $customer_id = $_POST['customer_id'];
        $book_id = $_POST['book_id'];
        $amount = $_POST['amount'];        $data_order = $_POST['data_order'];
        $query="update shopcart set customer_id='$customer_id',book_id='$book_id',amount='$amount',data_order='$data_order'         where id='$id'";
    }

    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    echo $json_response = json_encode($result);
}
?>