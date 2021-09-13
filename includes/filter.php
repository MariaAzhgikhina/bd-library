<?php 
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_POST['val'])){

    if($_POST['val'] == '1')    {
        $pricesmall = (integer) $_POST['pricesmall'];
        $pricebig = (integer) $_POST['pricebig'];

        $query="select * from filter_books where price>$pricesmall and price<$pricebig order by price";
    }    if($_POST['val'] == '2')    {
        $country = $_POST['f_country'];

        $query="select * from filter_books where country='$country'";
    }    if($_POST['val'] == '3')    {
        $publisher = $_POST['f_publisher'];

        $query="select * from filter_books where name='$publisher'";
    }    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);    $arr = array();
    if($result->num_rows > 0) {
	    while($row = $result->fetch_assoc()) {
		    $arr[] = $row;	
	    }
    }
    echo $json_response = json_encode($arr);
}
?>