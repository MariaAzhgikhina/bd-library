<?php 
require_once '../includes/db.php'; // The mysql database connection script
        $id = $_POST['id'];
        $title = $_POST['title'];
        $author_id = $_POST['author_id'];
        $type_id = $_POST['type_id'];
        $publisher_id = $_POST['publisher_id'];
        $query="update books set title='$title',author_id='$author_id',type_id='$type_id',price='$price', publisher_id='$publisher_id',amount='$amount'
    }
        $id = $_POST['id'];
        $lastname = $_POST['lastname'];
        $firstname = $_POST['firstname'];
        $description = $_POST['description'];
        $country = $_POST['country'];
        $query="update authors set lastname='$lastname',firstname='$firstname',description='$description',city='$city', country='$country'
    }
        $id = $_POST['id'];
        $name = $_POST['name'];
        $city = $_POST['city'];
        $country = $_POST['country'];
        $query="update publishers set name='$name',city='$city',country='$country'
    }
        $id = $_POST['id'];
        $name = $_POST['name'];
       
        $query="update type set name='$name' where id='$id'";
    }
        $id = $_POST['id'];
        $lastname = $_POST['lastname'];
        $firstname = $_POST['firstname'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $query="update customers set lastname='$lastname',firstname='$firstname',email='$email', phone='$phone'
    }

        $customer_id = $_POST['customer_id'];
        $book_id = $_POST['book_id'];
        $amount = $_POST['amount'];
        $query="update shopcart set customer_id='$customer_id',book_id='$book_id',amount='$amount',data_order='$data_order'
    }

    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    echo $json_response = json_encode($result);
}
?>