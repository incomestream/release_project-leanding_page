<?php
// получаем ID статьи, но учтите, т.к. это тренировочный
// скрипт мы не фильтруем содержимое $_POST
// в реальном скрипте фильтрация обязательна 
$article_id = $_POST['article_id'];

$connect = new mysqli("localhost", "poker_2312", "zxc123asd456", "poker_2312");

// считываем все данные статьи по $article_id
$result = $connect->query("select * from article where article_id = '$article_id'");
$row = $result->fetch_object();

// отправляем все данные в формате JSON нашему основному скрипту (index.php)
//формат JSON выглядит так:
// "ключ1":"значени1", "ключ2":"значени2" и т.д.
echo '{"article_id":"'.$row->article_id.'", 
    "article_title":"'.$row->article_title.'",
    "article_text":"'.$row->article_text.'",
    "article_author":"'.$row->article_author.'",
	"article_date":"'.$row->article_date.'"}';
?>