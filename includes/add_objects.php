<?php 
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_POST['val'])){
        $title = $_POST['title'];
        $author_id = $_POST['author_id'];
        $type_id = $_POST['type_id'];
        $publisher_id = $_POST['publisher_id'];

        $query="INSERT INTO books(title,author_id,type_id,price,publisher_id,amount)  VALUES ('$title', '$author_id', '$type_id', '$price', '$publisher_id', '$amount')";
    }
        $lastname = $_POST['lastname'];
        $firstname = $_POST['firstname'];
        $description = $_POST['description'];
        $country = $_POST['country'];

        $query="INSERT INTO authors(lastname,firstname,description,city,country)  VALUES ('$lastname', '$firstname', '$description', '$city', '$country')";
    }
        $name = $_POST['name'];
        $city = $_POST['city'];
        $country = $_POST['country'];
        $query="INSERT INTO publishers(name,city,country)  VALUES ('$name', '$city', '$country')";
    }
        $name = $_POST['name'];
        $query="INSERT INTO type(name)  VALUES ('$name')";
    }
        $lastname = $_POST['lastname'];
        $firstname = $_POST['firstname'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $query="INSERT INTO customers(lastname,firstname,email,phone)  VALUES ('$lastname', '$firstname', '$email', '$phone')";
    }
        $customer_id = $_POST['customer_id'];
        $book_id = $_POST['book_id'];
        $amount = $_POST['amount'];
        $query="INSERT INTO shopcart(customer_id,book_id,amount,data_order)  VALUES ('$customer_id', '$book_id', '$amount', '$data_order')";
    }
   
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    //$result = $mysqli->affected_rows;
    echo $json_response = json_encode($result);
}
?>