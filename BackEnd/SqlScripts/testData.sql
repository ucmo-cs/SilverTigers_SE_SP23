USE bank_db;

INSERT INTO bank_user (username, password)
VALUES ('John', 'pass');

INSERT INTO statement (amount, date, frequency, name, planned, user_id)
VALUES
(2000, '2023-03-03', 'na', 'Paid', True, (SELECT user_id FROM bank_user WHERE username='John')),
(25, '2023-03-04', 'na', 'Gift', False, (SELECT user_id FROM bank_user WHERE username='John')),
(-700, '2023-03-04', 'na', 'Rent', True, (SELECT user_id FROM bank_user WHERE username='John')),
(-150.75, '2023-03-10', 'na', 'Groceries', True, (SELECT user_id FROM bank_user WHERE username='John')),
(-200, '2023-03-15', 'na', 'New tire', False, (SELECT user_id FROM bank_user WHERE username='John')),
(2000, '2023-03-20', 'na', 'Paid', True, (SELECT user_id FROM bank_user WHERE username='John')),
(-20, '2023-03-20', 'na', 'Meal', False, (SELECT user_id FROM bank_user WHERE username='John')),
(-1000, '2023-03-20', 'na', 'Sick new scooter', False, (SELECT user_id FROM bank_user WHERE username='John')),
(-500, '2023-03-21', 'na', 'Fix sick new scooter', False, (SELECT user_id FROM bank_user WHERE username='John')),
(300, '2023-03-25', 'na', 'Sell sick new scooter :(', False, (SELECT user_id FROM bank_user WHERE username='John'));