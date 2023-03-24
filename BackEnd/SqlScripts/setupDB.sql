drop database bank_db;
drop user springuser;

create database bank_db;

create user springuser identified by 'password';
grant all on bank_db.* to springuser;