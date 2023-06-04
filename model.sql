create database dorixona;

create table region(
    id int primary key,
    name varchar(50)
);

create table district(
    id int primary key auto_increment,
    name varchar(50),
    region_id int
);

create table stock(
    id int primary key auto_increment,
    medicine_id int not null,
    pharmacy_id int not null,
    quantity int not null
);

create table pharmacies(
    id int primary key auto_increment,
    name varchar(255) not null,
    address varchar(255) not null,
    location varchar(255) not null,
    phone varchar(50) not null,
    email varchar(50) not null,
    region_id int not null,
    district_id int
);

create table medicines(
    id int primary key auto_increment,
    name varchar(255) not null,
    manufacturer varchar(50) not null,
    medicine_type_id int not null,
    price float(10,2),
    expiry_date date,
    info varchar(255)
);

create table medicine_type(
    id int primary key auto_increment,
    name varchar(255)
);


select medicines.name, medicine_type.name as medicine_type, medicines.price, medicines.info, medicines.manufacturer, medicines.expiry_date  
from medicines 
inner join medicine_type on medicine_type_id=medicine_type.id

-- 

select medicines.name, medicine_type.name as medicine_type, medicines.price, medicines.info, medicines.manufacturer, medicines.expiry_date, pharmacies.name, pharmacies.address, region.name, district.name  
from stock
inner join medicines on medicine_id=medicines.id
inner join medicine_type on medicines.medicine_type_id=medicine_type.id
inner join pharmacies on pharmacy_id=pharmacies.id
inner join region on pharmacies.region_id=region.id
inner join district on pharmacies.district_id=district.id
inner join district region_id=region.id;

-- 

select pharmacies.name as pharm_name, pharmacies.address, pharmacies.phone, region.name as region, district.name as district, medicines.name as medicine_name, stock.quantity from pharmacies inner join region on region_id=region.id inner join district on district.region_id=region.id inner join stock on id=stock.pharmacy_id inner join medicines stock.medicine_id=medicines.id

-- 

select pharmacies.name as pharm_name, pharmacies.address, pharmacies.phone, region.name as region, district.name as district, medicines.name as medicine_name, medicine_type.name as medicine_type, medicines.price, medicines.info, medicines.manufacturer, medicines.expiry_date, stock.quantity from pharmacies join region on region_id=region.id join district on district.region_id=region.id join stock on pharmacies.id=stock.pharmacy_id join medicines on stock.medicine_id=medicines.id join medicine_type on medicines.medicine_type_id=medicine_type.id where quantity>0 and medicines.name=?
