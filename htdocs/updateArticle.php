<?php
$article_id = $_POST['article_id'];
$article_title = $_POST['article_title'];
$article_text = $_POST['article_text'];
$article_author = $_POST['article_author'];

$connect = new mysqli("localhost", "root", "", "managerarticle");
$connect->query("update article set 
                                article_title = '$article_title', 
                                article_text = '$article_text', 
                                article_author = '$article_author'
                             where
                                article_id = '$article_id'");
?>