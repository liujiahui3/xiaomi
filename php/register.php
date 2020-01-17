<?php
include "conn.php";
if(isset($_POST['submit'])){
    $user = $_POST['username'];
    $pass = $_POST['password'];
    $conn->query("INSERT register VALUES(null,'$user','$pass')");
    header('location:http://10.31.152.32/xiaomi/dist/login.html');
}

if(isset($_POST['username'])){
    $user=$_POST['username'];
    $result=$conn->query("select * from register where username='$user'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}

if(isset($_POST['username']) && isset($_POST['password'])){
    $user=$_POST['username'];
    $pass=$_POST['password'];
    $result=$conn->query("select * from register where username='$user' and password='$pass");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
    header('location:http://10.31.152.32/xiaomi/dist/index.html');
}

