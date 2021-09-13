<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_POST['val'])){

    if($_POST['val'] == '1'){
        $search = $_POST['user'];
        $query="select * from ShopcartUsers where customername = '$search' ";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
        $arr = array();
        if($result->num_rows > 0) {
	        while($row = $result->fetch_assoc()) {
		        $arr[] = $row;	
	        }
        }
    }
    if($_POST['val'] == '2'){
        $search = $_POST['publisher'];
        $query="select * from PublisherSales where name = '$search'";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
        $arr = array();
        if($result->num_rows > 0) {
	        while($row = $result->fetch_assoc()) {
		        $arr[] = $row;
	        }
        }
    }
    if($_POST['val'] == '3'){
        $date = $_POST['date'];
        $query="select * from soldbooks having data_order = '$date'";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
        $arr = array();
        if($result->num_rows > 0) {
	        while($row = $result->fetch_assoc()) {
		        $arr[] = $row;
	        }
        }
    }
    # JSON-encode the response
    echo $json_response = json_encode($arr);
}

?> 

