<?php 
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_POST['id'])){
    $id = $_POST['id'];

    if($_POST['val'] == '1') $query="delete from books where id='$id'";    if($_POST['val'] == '2') $query="delete from authors where id='$id'";    if($_POST['val'] == '3') $query="delete from publishers where id='$id'";    if($_POST['val'] == '4') $query="delete from type where id='$id'";    if($_POST['val'] == '5') $query="delete from customers where id='$id'";    if($_POST['val'] == '6') $query="delete from shopcart where id='$id'";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

//$result = $mysqli->affected_rows;

echo $json_response = json_encode($result);
}
?>