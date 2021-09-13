<?php 
require_once '../includes/db.php'; // The mysql database connection scriptif(isset($_POST['search'])){

    $search = $_POST['search'];
    $sort= $_POST['sort'];
    if($_POST['val'] == '1')
        $query="select *
        from books 
        where books.title like '%$search%' order by $sort";
    if($_POST['val'] == '2')
        $query="select *
        from authors 
        where lastname like '%$search%' order by $sort";
    if($_POST['val'] == '3')
        $query="select *
        from publishers 
        where name like '%$search%' order by $sort";
    if($_POST['val'] == '4')
        $query="select *
        from type 
        where name like '%$search%' order by $sort";
    if($_POST['val'] == '5')
        $query="select *
        from customers
        where lastname like '%$search%' order by $sort";
    if($_POST['val'] == '6')
        $query="select *
        from shopcart 
        where data_order like '%$search%' order by $sort";

        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    $arr = array();
    if($result->num_rows > 0) {
	    while($row = $result->fetch_assoc()) {
		    $arr[] = $row;	
	    }
    }
    # JSON-encode the response
    echo $json_response = json_encode($arr);
}
?> 