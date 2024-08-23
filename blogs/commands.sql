CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Jeff Atwood', 'https://blog.codinghorror.com/the-cloud-is-just-someone-elses-computer/', 'The Cloud Is Just Someone Else''s Computer');

INSERT INTO blogs (author, url, title) VALUES ('Jeff Atwood', 'https://blog.codinghorror.com/code-smells/', 'Code Smells');
