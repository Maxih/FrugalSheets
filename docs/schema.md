# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
firstname       | string    | not null
lastname        | string    | not null
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## documents
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
author_id   | integer   | not null, foreign key (references users), indexed
timestamps  | timestamps| not null

## sheets
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
document_id | integer   | not null, foreign key (references documents), indexed
name        | string    | not null
content     | string    | not null

## groups
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users), indexed
name        | string    | not null

## group_documents
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
document_id | integer   | not null, foreign key (references documents), indexed, unique [tag_id]
group_id    | integer   | not null, foreign key (references groups), indexed

## user_groups
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed, unique [tag_id]
group_id    | integer   | not null, foreign key (references groups), indexed
