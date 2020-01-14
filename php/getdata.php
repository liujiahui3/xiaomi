<?php
include "conn.php";

$arrdata = array();
$result = $conn->query("SELECT * FROM phone");
for($i=0;$i<$result->num_rows;$i++){
    $arrdata[$i]=$result->fetch_assoc();
};
echo json_encode($arrdata);