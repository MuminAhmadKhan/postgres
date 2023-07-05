CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  url VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  likes INTEGER DEFAULT 0
);

insert into blogs (author,url,title) values ('Raed' , 'www.raed.com' , 'Fun');
insert into blogs (author,url,title) values ('Daneen' , 'www.daneen.com' , 'Hajj');
select * from blogs;