<?php
class index
{
    // в этом методы мы будем хранить свои JS скрипты
    private function indexJS()
    {
        ?>
        <script type="text/javascript">
        $(document).ready( function() {
            // обрабатываем событие нажатия на любую из ссылок
            $('a').click( function () {
                // получаем ID статьи из параметра title
                var article_id = $(this).attr("title");
                
                // отправляем AJAX запрос
                $.ajax({
                    type: "POST",
                    // я рекомендую хранить путь к скрипту в невидимом поле, как в случае с ID статьи
                    // и получать его вот так: $('input[name = urlSctipt]').val()
                    url: "http://localhost/poker/htdocs/readArticle.php",
                    dataType: 'json',
                    data: "article_id=" + article_id,
                    // success - это обработчик удачного выполнения событий
                    // кроме него есть другие варианты, например error
                    // об этом вы можете прочесть на соответствующих сайтах
                    success: function(data, textStatus, xhr) {
                        // записываем полученные значения в нашу форму
                        $('input[name=article_id]').val(data.article_id);
                        $('input[name=article_title]').val(data.article_title);
                        $('textarea[name=article_text]').val(data.article_text);
                        $('input[name=article_author]').val(data.article_author);
                    }
                });
            });
            
            // обрабатываем событие нажатия на кнопку "Сохранить изменения""
            $('input[name=updateArticle]').click( function () {
                // получаем данные для отправки в БД из полей
                var article_id = $('input[name=article_id]').val();
                var article_title = $('input[name=article_title]').val();
                var article_text = $('textarea[name=article_text]').val();
                var article_author = $('input[name=article_author]').val();
                
                // отправляем AJAX запрос
                $.ajax({
                    type: "POST",
                    // я рекомендую хранить путь к скрипту в невидимом поле, как в случае с ID статьи
                    // и получать его вот так: $('input[name = urlSctipt]').val()
                    url: "http://localhost/poker/htdocs/updateArticle.php",
                    dataType: 'json',
                    data: "article_id=" + article_id
                     + "&article_title=" + article_title
                     + "&article_text=" + article_text
                     + "&article_author=" + article_author,
                    // success - это обработчик удачного выполнения событий
                    // кроме него есть другие варианты, например error
                    // об этом вы можете прочесть на соответствующих сайтах
                    success: function() {
                        alert("Статья обновлена!");
                    }
                });
            });
            
            // обрабатываем событие нажатия на кнопку "Сохранить изменения""
            $('input[name=addArticle]').click( function () {
                var article_title = $('input[name=article_title_new]').val();
                var article_text = $('textarea[name=article_text_new]').val();
                var article_author = $('input[name=article_author_new]').val();
                
                // отправляем AJAX запрос
                $.ajax({
                    type: "POST",
                    // я рекомендую хранить путь к скрипту в невидимом поле, как в случае с ID статьи
                    // и получать его вот так: $('input[name = urlSctipt]').val()
                    url: "http://localhost/poker/htdocs/addArticle.php",
                    data: "article_title=" + article_title
                     + "&article_text=" + article_text
                     + "&article_author=" + article_author,
                    // success - это обработчик удачного выполнения событий
                    // кроме него есть другие варианты, например error
                    // об этом вы можете прочесть на соответствующих сайтах
                    success: function(response) {
                        if(response == "OK")
                        {
                            alert("Статья " + article_title + " добавлена!");
                            location.reload();
                        }
                        else
                            alert("Ошибка в запросе! Сервер вернул вот что: " + response);
                    }
                });
            });
        });
        </script>
        <?php
    }

    public function displayPage ()
    {
        ?>
        <html>
        <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <title>WorkMake.ru - блог о веб-программировании.</title>
        <script type="text/javascript" src="jQuery.js"></script>
        </head>
        <body>
            
        <table style="width: 100%; height: 100%; border: 3px brown solid; text-align: center;">
        <tr valign="top">
            <td style="width: 300px;">
                <h2>Список всех статей</h2>
                <?php
                //mysqli(хост, пользователь, пароль_пользователя, название_БД)
                $connect = new mysqli("localhost", "root", "", "managerarticle");
                
                //достаем из базы данных ID и заголовок всех статей
                $result = $connect->query("select article_id, article_title from article");
                
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
                        echo "<h4><a href='#' title=".$row->article_id.">".$row->article_title."</a></h4>";
                    }
                }
                else
                    echo "Пока нет ни одной статьи в базе данных.";
                ?>
            </td>
            <td style="width: 300px;">
                <h2>Форма редактирования статей</h2>
                <input type="text" name="article_id" hidden="hidden">
                
                <input type="text" name="article_title" style="width: 95%; height: 30px;" placeholder="Заголовок статьи">
                
                <textarea name="article_text" style="width: 95%; height: 300px; margin-top: 20px;" placeholder="Текст статьи"></textarea>
                
                <input type="text" name="article_author" style="width: 95%; height: 30px; margin-top: 20px;" placeholder="Автор статьи">
                
                <input type="button" name="updateArticle" style="width: 95%; height: 30px; margin-top: 20px;" value="Сохранить изменения">
            </td>
            <td style="width: 300px;">
                <h2>Форма добавления статей</h2>
                <input type="text" name="article_title_new" style="width: 95%; height: 30px;" placeholder="Заголовок статьи">
                
                <textarea name="article_text_new" style="width: 95%; height: 300px; margin-top: 20px;" placeholder="Текст статьи"></textarea>
                
                <input type="text" name="article_author_new" style="width: 95%; height: 30px; margin-top: 20px;" placeholder="Автор статьи">
                
                <input type="button" name="addArticle" style="width: 95%; height: 30px; margin-top: 20px;" value="Добавить новую статью">
            </td>
        </tr>    
        </table>    
            
        </body>
        </html>
        <?php
        // подключаем наши JS скрипты
        $this->indexJS();
    }
}

// создаем объект класса index
$webApp = new index();
// запускаем метод отображающий страницу
$webApp->displayPage();
?>