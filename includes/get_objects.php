<?php 
require_once '../includes/db.php'; // Получение объектовif(isset($_POST['val'])){
    if($_POST['val'] == '1')
    {
        $query="select * from books order by id";
        if($_POST['sorting'] == '1') $query="select * from books order by title";
        if($_POST['sorting'] == '2') $query="select * from books order by price";
        if($_POST['sorting'] == '3') $query="select * from books order by amount";
    }
        
    if($_POST['val'] == '2')
    {
        $query="select * from authors order by id";
        if($_POST['sorting'] == '1') $query="select * from authors order by lastname";
        if($_POST['sorting'] == '2') $query="select * from authors order by firstname";
        if($_POST['sorting'] == '3') $query="select * from authors order by city";
        if($_POST['sorting'] == '4') $query="select * from authors order by country";
    }
        
    if($_POST['val'] == '3'){
        $query="select * from publishers order by id";
        if($_POST['sorting'] == '1') $query="select * from publishers order by name";
        if($_POST['sorting'] == '2') $query="select * from publishers order by city";
        if($_POST['sorting'] == '3') $query="select * from publishers order by country";
    }
    if($_POST['val'] == '4'){
        $query="select * from type order by id";
        if($_POST['sorting'] == '1') $query="select * from type order by name";
    }
    if($_POST['val'] == '5'){
        $query="select * from customers order by id";
        if($_POST['sorting'] == '1') $query="select * from customers order by lastname";
        if($_POST['sorting'] == '2') $query="select * from customers order by firstname";
    }
    if($_POST['val'] == '6'){
        $query="select * from shopcart order by id";
        if($_POST['sorting'] == '1') $query="select * from shopcart order by amount";
        if($_POST['sorting'] == '2') $query="select * from shopcart order by data_order";
    }
}

$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
$arr = array();
if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$arr[] = $row;	
	}
}
# JSON-encode the response
echo $json_response = json_encode($arr);
?>