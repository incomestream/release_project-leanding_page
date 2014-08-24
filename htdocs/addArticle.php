<?php
$connect = new mysqli("localhost", "poker_2312", "zxc123asd456", "poker_2312");

// Вывод даты на русском
$monthes = array(
    1 => 'Января', 2 => 'Февраля', 3 => 'Марта', 4 => 'Апреля',
    5 => 'Мая', 6 => 'Июня', 7 => 'Июля', 8 => 'Августа',
    9 => 'Сентября', 10 => 'Октября', 11 => 'Ноября', 12 => 'Декабря'
);

if(!empty($_POST['article_title'])&&!empty($_POST['article_text'])&&!empty($_POST['article_author']))
{
 $article_title = $_POST['article_title'];	
   $article_text = $_POST['article_text'];
    $article_author=  $_POST['article_author'];
    $article_date =  date('d ')."- ". $monthes[(date('n'))] ." - ".date('Y ')."| ".date("H:i:s");

    if($connect->query("insert into article values (0, '$article_title', '$article_text', '$article_author','$article_date')"))
    echo "OK";

}

?>