<?php 
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_POST['id'])){
    $id = $_POST['id'];

    if($_POST['val'] == '1') $query="delete from books where id='$id'";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

//$result = $mysqli->affected_rows;

echo $json_response = json_encode($result);
}
?>