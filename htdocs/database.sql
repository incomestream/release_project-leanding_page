/*
    Имя самой БД: managerarticle
*/
create table article
(
    article_id integer not null auto_increment primary key,
    article_title varchar(300),
    article_text varchar(10000),
    article_author varchar(100)
);

insert into article values (0, 'Testoviy title 1', 'Testoviy text 1', 'Testoviy author 1');
insert into article values (0, 'Testoviy title 2', 'Testoviy text 2', 'Testoviy author 2');
insert into article values (0, 'Testoviy title 3', 'Testoviy text 3', 'Testoviy author 3');
insert into article values (0, 'Testoviy title 4', 'Testoviy text 4', 'Testoviy author 4');
insert into article values (0, 'Testoviy title 5', 'Testoviy text 5', 'Testoviy author 5');