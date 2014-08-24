<?php
// вся процедура работает на сессиях. Именно в ней хранятся данные пользователя, пока он находится на сайте. Очень важно запустить их в самом начале странички!!!
session_start();

include ("bd.php");// файл bd.php должен быть в той же папке, что и все остальные, если это не так, то просто измените путь 

if (isset($_COOKIE['auto']) and isset($_COOKIE['login']) and isset($_COOKIE['password']))
{//если есть необходимые переменные
	if ($_COOKIE['auto'] == 'yes') { // если пользователь желает входить автоматически, то запускаем сессии
		  $_SESSION['password']=strrev(md5($_COOKIE['password']))."b3p6f"; //в куках пароль был не зашифрованный, а в сессиях обычно храним зашифрованный
		  $_SESSION['login']=$_COOKIE['login'];//сессия с логином
		  $_SESSION['id']=$_COOKIE['id'];//идентификатор пользователя
		}	
	}

if (!empty($_SESSION['login']) and !empty($_SESSION['password']))
{
//если существет логин и пароль в сессиях, то проверяем их и извлекаем аватар
$login = $_SESSION['login'];
$password = $_SESSION['password'];
$result = mysql_query("SELECT id,avatar FROM users WHERE login='$login' AND password='$password' AND activation='1'",$db); 
$myrow = mysql_fetch_array($result);
//извлекаем нужные данные о пользователе
}
?>
<!DOCTYPE html>
<html>
<head>
<!-- Google Analytics Content Experiment code -->
<!-- End of Google Analytics Content Experiment code -->
    <title>POKER | Лучшие условия для серьезных игроков</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">
	<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE">
	<link rel="shortcut icon" href="../i/favicon.ico" type="image/x-icon">
  <link rel="icon" href="../i/favicon.ico" type="image/x-icon">
	<link rel="StyleSheet" href="../css/fonts.css" type="text/css">
  <link rel="StyleSheet" href="../css/common.css" type="text/css">
  <link rel="StyleSheet" href="../css/design.css" type="text/css">
  <link rel="StyleSheet" href="../css/animation.css" type="text/css">
    <link rel="StyleSheet" href="../css/admin.css" type="text/css">

</head>
<body>
<?php
if (!isset($myrow['avatar']) or $myrow['avatar']=='') {
//проверяем, не извлечены ли данные пользователя из базы. Если нет, то он не вошел, либо пароль в сессии неверный. Выводим окно для входа. Но мы не будем его выводить для вошедших, им оно уже не нужно.
print <<<HERE

<div class="title"><p>Админ Панель : <a href="http://clientintop.ru/poker/">Poker</a></p></div>
<div class="form">

<form action="testreg.php" method="post">
	<div class="login">
<input type="text" name="login"  placeholder="Логин"></div>
HERE;

if (isset($_COOKIE['login'])) 
{
echo ' value="'.$_COOKIE['login'].'">';
}

print <<<HERE
	<div class="pass">
<input type="text" name="password"  class="pass" placeholder="Пароль"></div>
HERE;

if (isset($_COOKIE['login'])) 
{
echo ' value="'.$_COOKIE['login'].'">';
}

print <<<HERE
<button type="submit" name="submit">Войти</button>
</form>
</div>
<div class="logo">
	<a href="/poker/"><img src="logo.png"></a>
<p>client in top</p>
</div>


HERE;
}

else
{
//при удачном входе пользователю выдается все, что расположено ниже между звездочками.
//************************************************************************************
print <<<HERE
<div class="head">
<div class="wrap">
<div class="left"><a href="/poker/"><img src="	logo_admin.png"></a></div>
<div class="right"><span> $_SESSION[login] | <a href='exit.php'>Выход</a></span></div>
</div>
</div> 

<div class="table">
<div class="titles"><p>Заявки</p></div>
<table class="table demo" data-page-size="10">
    <thead>
    <tr>
    <td class="one">Skype</td>
    <td class="two">Дата</td>
    <td class="three">Имя</td>
    <td class="four">E-Mail</td>
</tr>
</thead>
<tbody>
HERE;

                //mysqli(хост, пользователь, пароль_пользователя, название_БД)
                $connect = new mysqli("localhost", "poker_2312", "zxc123asd456", "poker_2312");
                
                //достаем из базы данных ID и заголовок всех статей
                /*my*/



                $result = $connect->query("select * from article ORDER BY article_date DESC");
               
                
                //определяем количество полученных записей
                $colResult = $result->num_rows;
                
                if($colResult > 0)
                {
                    for($i = 0; $i < $colResult; $i++)
                    {
                        $row = $result->fetch_object();
                        // выводим все заголовки статей в виде ссылок на #, т.е. никуда не ведущих и с параметром title
                        // которое будет являться ID статьи, это нужно для того, чтобы мы могли определить на какую
                        // статью нажал пользователь
                        echo "<tr><td class=\"one\">".$row->article_author."</td><td class=\"two\">".$row->article_date."</td><td class=\"three\">".$row->article_title."</td><td class=\"four\"> ".$row->article_text."</td></tr>";
                    }
                }
                else
                    echo "<tr><td colspan=\"4\" align=\"center\">Пока не поступало ни одной заявки!</td></tr>";
               
print <<<HERE
</tbody>
<tfoot>
                        <tr>
                            <td colspan="5">
                                <div class="pagination pagination-centered"></div>
                            </td>
                        </tr>
                    </tfoot>
	</table>

	</div>
HERE;
                

//************************************************************************************
//при удачном входе пользователю выдается все, что расположено ВЫШЕ между звездочками.
}

?>

<!-- End Popup's -->
<script type="text/javascript" src="../js/jquery.min.js"></script>
<script type="text/javascript" src="../js/jquery-ui-1.10.4.custom.min.js"></script>
<script type="text/javascript" src="../js/jquery.formChecker.js"></script>
<script type="text/javascript" src="../js/3deye.min.js"></script>
<script type="text/javascript" src="../js/scripts.js"></script>

<script type="text/javascript" src="../js/footable.js"></script>
<script type="text/javascript" src="../js/footable.paginate.js"></script>
    <script type="text/javascript">
        $(function () {
            $('table').footable();

            $('.clear-filter').click(function (e) {
                e.preventDefault();
                $('table.demo').trigger('footable_clear_filter');
                $('.filter-status').val('');
            });

            $('.filter-status').change(function (e) {
                e.preventDefault();
                var filter = $(this).val();
                $('#filter').val($(this).text());
                $('table.demo').trigger('footable_filter', {filter: filter});
            });
        });
    </script>
</body>
</html>
