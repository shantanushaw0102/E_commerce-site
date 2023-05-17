CREATE TABLE users (id INTEGER, username TEXT NOT NULL, hash TEXT NOT NULL, PRIMARY KEY(id));
CREATE UNIQUE INDEX username ON users (username);
CREATE TABLE notes( 
noteid TEXT,
Userid INTEGER,
title TEXT NOT NULL,
note TEXT NOT NULL,
creation DATE DEFAULT (DATETIME('now','localtime')),
edited DATE DEFAULT (DATETIME('now','localtime')),
PRIMARY KEY(noteid),
FOREIGN KEY(Userid) REFERENCES users(id)
);
CREATE UNIQUE INDEX noteid ON notes (noteid);
