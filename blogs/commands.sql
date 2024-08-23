CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Jeff Atwood', 'https://blog.codinghorror.com/the-cloud-is-just-someone-elses-computer/', 'The Cloud Is Just Someone Else''s Computer');

insert into blogs (author, url, title) values ('Jeff Atwood', 'https://blog.codinghorror.com/code-smells/', 'Code Smells');
