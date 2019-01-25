# Lab 14: Database Normalization

## Overview

Today you will be seeding a database, then executing a series of commands to normalize your data into two tables: books and bookshelves. You will execute a series of SQL commands, as demonstrated in class and detailed below, to normalize your data and remove duplications.

If the normalization is successful, the user will not be aware that anything has changed.

At the end of this process, your tables should be represented in your database as two tables:

- A table for bookshelves. This table will be referenced by the books table, below.


```sql
                                     Table "public.bookshelves"
  Column   |          Type          | Collation | Nullable |                Default                
-----------+------------------------+-----------+----------+---------------------------------------
 id        | integer                |           | not null | nextval('bookshelf_id_seq'::regclass)
 name      | character varying(255) |           |          | 
Indexes:
    "bookshelves_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "books" CONSTRAINT "fk_bookshelf" FOREIGN KEY (bookshelf_id) REFERENCES bookshelves(id)
```

- A table for books. This table will have a `bookshelf_id` property which is a foreign key that references the `id` property of the `bookshelves` table.

```sql
                                     Table "public.books"
    Column    |          Type          | Collation | Nullable |              Default              
--------------+------------------------+-----------+----------+-----------------------------------
 id           | integer                |           | not null | nextval('books_id_seq'::regclass)
 title        | character varying(255) |           |          | 
 author       | character varying(255) |           |          | 
 isbn         | character varying(255) |           |          | 
 image_url    | character varying(255) |           |          | 
 description  | text                   |           |          | 
 bookshelf_id | integer                |           |          | 
Indexes:
    "books_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "fk_bookshelf" FOREIGN KEY (bookshelf_id) REFERENCES bookshelves(id)
```

### Time Estimate

For each of the features listed below, make an estimate of the time it will take you to complete the feature, and record your start and finish times for that feature:

```
Number and name of feature: ________________________________

Estimate of time needed to complete: _____

Start time: _____

Finish time: _____

Actual time needed to complete: _____
```

Add this information to your README.

## Database Setup

You will be working in a separate database for this lab assignment. This separate database is intended to serve as a place to practice the process of normalizing a database while not resulting in a broken book app. You are encouraged to retype the provided commands in your PSQL shell.

In your PSQL shell, make a copy of your books database using one of the following two methods.

- Method 1. Copy your book database with the following command, replacing `books` with your database name, if it differs:

`CREATE DATABASE lab14 WITH TEMPLATE books;` 

Confirm the success of this process by connecting to the `lab14` database and typing `SELECT COUNT(*) FROM books;`, where you should see the same data you have in your existing database.

- Method 2. In your PSQL shell, create a new database named `lab14`. Then, load the provided `schema.sql` file with the following command:

`psql -d lab14 -f schema.sql`

Confirm the success of this process by connecting to the your new database and typing `SELECT COUNT(*) FROM books;`, where you should see the same data that was provided in the `schema.sql` file.

Once your database is confirmed as being properly populated you are ready to proceed to the migration phase.

## Database Migration

Query 1: `CREATE TABLE BOOKSHELVES (id SERIAL PRIMARY KEY, name VARCHAR(255));`

- This query will create a second table in the `books_app` database named `bookshelves`. Confirm the success of this command by typing `\d bookshelves` in your SQL shell. You should see the bookshelves table schema, as shown above, with the exception of the foreign key which will be added later.

Query 2: `INSERT INTO bookshelves(name) SELECT DISTINCT bookshelf FROM books;`

- This query will use a simple subquery to retrieve unique bookshelf values from the books table and insert each one into the bookshelves table in the `name` column. This is a great pattern for copying lots of data between tables. 
- Confirm the success of this command by typing `SELECT COUNT(*) FROM bookshelves;` in your SQL shell. The number should be greater than zero.

Query 3: `ALTER TABLE books ADD COLUMN bookshelf_id INT;`

- This query will add a column to the books table named `bookshelf_id`. This will connect each book to a specific bookshelf in the other table. 
- Confirm the success of this command by typing `\d books` in your SQL shell. The table schema should now include a column for `bookshelf_id`, in addition to the column for the string `bookshelf`; the `bookshelf` column will be removed in Query 5.

Query 4: `UPDATE books SET bookshelf_id=shelf.id FROM (SELECT * FROM bookshelves) AS shelf WHERE books.bookshelf = shelf.name;`

- This query will prepare a connection between the two tables. It works by running a subquery for every row in the `books` table. The subquery finds the bookshelf row that has a `name` matching the current book's `bookshelf` value. The `id` of that bookshelf row is then set as the value of the `bookshelf_id` property in the current book row. 
- Confirm the success of this command by typing `SELECT bookshelf_id FROM books;` in your SQL shell. The result should display a column containing the unique ids for the bookshelves. The numbers should match the total number returned from Query 2 when you confirmed the success of the insertion of names into the bookshelves table.

Query 5: `ALTER TABLE books DROP COLUMN bookshelf;`

- This query will modify the books table by removing the column named `bookshelf`. Now that the books table contains a `bookshelf_id` column which will become a foreign key, your table does not need to contain a string representing each bookshelf. 
- Confirm the success of this command by typing `\d books` in your SQL shell. The books table schema should be updated to reflect the schema provided above, without the `bookshelf` column.

Query 6: `ALTER TABLE books ADD CONSTRAINT fk_bookshelves FOREIGN KEY (bookshelf_id) REFERENCES bookshelves(id);`

- This query will modify the data type of the `bookshelf_id` in the books table, setting it as a foreign key which references the primary key in the bookshelves table. Now PostgreSQL knows HOW these 2 tables are connected.
- Confirm the success of this command by typing `/d books` in your SQL shell. You should see details about the foreign key constraints, as shown in the schema above.

## Stretch Goal: Modify the existing book app code base (if you choose to normalize your book app database)

Your code will need to be modified in several ways now that the data is being retrieved from two tables. Some of the following items will need to be changed, depending on how your server and EJS files are structured.

- In the server code:
    - Your query to view the details of a single book will need to request information from both the books table and the bookshelves table. This should be done as a single JOIN query.
    - If you have a query to request the bookshelves from the books table, it will now need to request `name` of rows from the `bookshelves` table.
    - Your query to add a single book might need to create records in both tables. Ensure a bookshelf doesn't already exist before adding to the `bookshelves` table!

- In the EJS files:
    - Any reference to the `bookshelf` from the `books` table will now need to refer to the `name` of the shelf from the `bookshelves` table.

## Submission Instructions

Once you have completed this assignment, type the command `\d books` to display your books schema. Then type the  command `\d bookshelves` to display your bookshelves schema. Ensure that both schemas fit on the screen at the same time, then take a screenshot. Submit this screenshot in the corresponding Canvas assignment and include a comment stating how long this assignment took to complete.
