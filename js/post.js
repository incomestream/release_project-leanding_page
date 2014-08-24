  $(document).ready( function() {
            $('a').click( function () {
                var article_id = $(this).attr("title");
                $.ajax({
                    type: "POST",
                    url: "http://clientintop.ru/poker/htdocs/readArticle.php",
                    dataType: 'json',
                    data: "article_id=" + article_id,
                    success: function(data, textStatus, xhr) {
                        $('input[name=article_id]').val(data.article_id);
                        $('input[name=article_title]').val(data.article_title);
                        $('input[name=article_text]').val(data.article_text);
                        $('input[name=article_author]').val(data.article_author);
                    }
                });
            });
            $('input[name=addArticle]').click( function () {
                var article_title = $('input[name=article_title_new]').val();
                var article_text = $('input[name=article_author_new]').val();
                var article_author = $('input[name=article_title_skype]').val();

                $.ajax({
                    type: "POST",
                    url: "http://clientintop.ru/poker/htdocs/addArticle.php",
                    data: "article_title=" + article_title
                     + "&article_text=" + article_text
                     + "&article_author=" + article_author,
                    success: function(response) {
                        if(response == "OK")
                        {}}});});

                  $('input[name=addArticle2]').click( function () {
                var article_title = $('input[name=article_title_new2]').val();
                var article_text = $('input[name=article_author_new2]').val();
                var article_author = $('input[name=article_title_skype2]').val();

                $.ajax({
                    type: "POST",
                    url: "http://clientintop.ru/poker/htdocs/addArticle2.php",
                    data: "article_title=" + article_title
                     + "&article_text=" + article_text
                     + "&article_author=" + article_author,
                    success: function(response) {
                        if(response == "OK")
                        {}}});});


          });