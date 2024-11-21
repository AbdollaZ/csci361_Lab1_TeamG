            -- SELECT 
            --     ProductId,
            --     ProductName, 
            --     ProductCategory, 
            --     ProductQuantity, 
            --     ProductPrice,
            --     FarmerId,
            --     FarmID
            -- FROM Product

-- CREATE TABLE Farmer (
-- FarmerID SERIAL PRIMARY KEY,
-- FarmerName VARCHAR(100) NOT NULL,
-- FarmerSurname VARCHAR(100) NOT NULL,
-- FarmerEmail VARCHAR(255) UNIQUE NOT NULL,
-- PhoneNumber VARCHAR(20),
-- FarmLocation VARCHAR(255)
-- );

-- CREATE TABLE Product (
-- ProductID SERIAL PRIMARY KEY,
-- ProductName VARCHAR(100) NOT NULL,
-- ProductCategory VARCHAR(50) NOT NULL,
-- ProductQuantity INT NOT NULL,
-- ProductPrice DECIMAL(10, 2) NOT NULL,
-- FarmerID INT REFERENCES Farmer(FarmerID)
-- -- FarmID INT REFERENCES Farm(FarmID)
-- );

-- alter table product 
-- add column FarmID INT REFERENCES Farm(FarmID);

-- CREATE TABLE Farm (
-- FarmID SERIAL PRIMARY KEY,
-- FarmerID INT REFERENCES Farmer(FarmerID),
-- FarmName VARCHAR(100) NOT NULL,
-- Location VARCHAR(255) NOT NULL,
-- Price DECIMAL(10, 2),
-- FarmSize DECIMAL(10, 2)
-- -- ProductID INT REFERENCES Product(ProductID)
-- );

-- CREATE TABLE Buyer (
-- BuyerID SERIAL PRIMARY KEY,
-- Name VARCHAR(100) NOT NULL,
-- Surname VARCHAR(100) NOT NULL,
-- BuyerEmail VARCHAR(255) UNIQUE NOT NULL,
-- PhoneNumber VARCHAR(20),
-- Address VARCHAR(255)
-- );

-- CREATE TABLE Orders (
-- OrderID SERIAL PRIMARY KEY,
-- OrderDay INT CHECK (OrderDay BETWEEN 1 AND 31),
-- OrderMonth INT CHECK (OrderMonth BETWEEN 1 AND 12),
-- OrderYear INT CHECK (OrderYear >= 2000),
-- OrderQuantity INT NOT NULL,
-- BuyerID INT REFERENCES Buyer(BuyerID),
-- OrderStatus VARCHAR(50)
-- );

-- CREATE TABLE Delivery (
-- DeliveryID SERIAL PRIMARY KEY,
-- DeliveryMethod VARCHAR(100) NOT NULL,
-- DeliveryStatus VARCHAR(50),
-- DeliveryDate DATE NOT NULL,
-- DeliveryCost DECIMAL(10, 2) NOT NULL,
-- OrderID INT REFERENCES Orders(OrderID),
-- FarmerID INT REFERENCES Farmer(FarmerID)
-- );



-- INSERT INTO Farmer (FarmerID,FarmerName, FarmerSurname, FarmerEmail,
-- PhoneNumber, FarmLocation) VALUES
-- ('1','Alikhan', 'Nursultanov', 'alikhan.nursultanov@email.kz', '777-123-4567',
-- 'Almaty, Kazakhstan'),
-- ('2','Aigerim', 'Baimukhanova', 'aigerim.baimukhanova@email.kz',
-- '777-234-5678', 'Shymkent, Kazakhstan'),
-- ('3','Yerzhan', 'Tolegenov', 'yerzhan.tolegenov@email.kz', '777-345-6789',
-- 'Karaganda, Kazakhstan'),
-- ('4', 'Zhanar', 'Akhmetova', 'zhanar.akhmetova@email.kz', '777-456-7890',
-- 'Astana, Kazakhstan'),
-- ('5','Daulet', 'Abdrakhmanov', 'daulet.abdrakhmanov@email.kz', '777-567-8901',
-- 'Aktobe, Kazakhstan'),
-- ('6','Gulnara', 'Mukhtarova', 'gulnara.mukhtarova@email.kz', '777-678-9012',
-- 'Pavlodar, Kazakhstane'),
-- ('7','Serik', 'Kenzhebayev', 'serik.kenzhebayev@email.kz', '777-789-0123',
-- 'Taraz, Kazakhstan'),
-- ('8','Bakytzhan', 'Zhaksylykov', 'bakytzhan.zhaksylykov@email.kz',
-- '777-890-1234', 'Kyzylorda, Kazakhstan'),
-- ('9','Aizhan', 'Sarsembayeva', 'aizhan.sarsembayeva@email.kz', '777-901-2345',
-- 'Oskemen, Kazakhstan'),
-- ('10','Nurbol', 'Turganbayev', 'nurbol.turganbayev@email.kz', '777-012-3456',
-- 'Semey, Kazakhstan');


-- INSERT INTO Farm (FarmID, FarmerID, FarmName, Location, Price, FarmSize) VALUES
-- ('1', '1', 'Green Valley Farm', 'Almaty, Kazakhstan', 500000, 150),
-- ('2', '2', 'Golden Harvest', 'Shymkent, Kazakhstan', 650000, 200),
-- ('3', '3', 'Tolegen Ranch', 'Karaganda, Kazakhstan', 550000, 180),
-- ('4', '4', 'Akhmetova Fields', 'Astana, Kazakhstan', 700000, 220),
-- ('5', '5', 'Daulets Farmstead', 'Aktobe, Kazakhstan', 480000, 170),
-- ('6', '6', 'Mukhtarova Farms', 'Pavlodar, Kazakhstan', 530000, 190),
-- ('7', '7', 'Kenzhebayev Ranch', 'Taraz, Kazakhstan', 610000, 210),
-- ('8', '8', 'Zhaksylyk Ranch', 'Kyzylorda, Kazakhstan', 590000, 195),
-- ('9', '9', 'Sarsembayevas Lands', 'Oskemen, Kazakhstan', 460000, 165),
-- ('10','10', 'Turganbayev Farms', 'Semey, Kazakhstan', 500000, 175);



-- INSERT INTO Product (ProductID, ProductName, ProductCategory, ProductQuantity,
-- ProductPrice, FarmerID, FarmID) VALUES
-- (1, 'Wheat', 'Grains', 5000, 235, 1, 1),
-- (2, 'Corn', 'Grains', 6000, 211, 2, 2),
-- (3, 'Cotton', 'Fibers', 4000, 564, 3, 3),
-- (4, 'Barley', 'Grains', 4500, 259, 4, 4),
-- (5, 'Sunflower', 'Oilseeds', 3000, 423, 5, 5),
-- (6, 'Potatoes', 'Vegetables', 7000, 141, 6, 6),
-- (7, 'Apples', 'Fruits', 3500, 353, 7, 7),
-- (8, 'Rice', 'Grains', 5500, 282, 8, 8),
-- (9, 'Carrots', 'Vegetables', 5000, 118, 9, 9),
-- (10, 'Soybeans', 'Oilseeds', 6000, 400, 10, 10);

-- INSERT INTO Orders (OrderID, OrderDay, OrderMonth, OrderYear,
-- OrderQuantity, OrderStatus) VALUES
-- ('1',5, 10, 2024, 1500, 'Delivered'),
-- ('2',12, 9, 2023, 2000, 'Pending'),
-- ('3',20, 8, 2023, 1800,'Canceled'),
-- ('4',1, 7, 2024, 500, 'Delivered'),
-- ('5',15, 10, 2024, 3000, 'Delivered');


-- INSERT INTO Buyer (BuyerID, Name, Surname, BuyerEmail, PhoneNumber, Address)
-- VALUES
-- ('1','Timur', 'Zhaksybayev', 'timur.zh@email.kz', '7700-123-456', 'Almaty,
-- Kazakhstan'),
-- ('2','Aliya', 'Baisheva', 'aliya.baisheva@email.kz', '7701-234-567', 'Shymkent,
-- Kazakhstan'),
-- ('3','Nurlan', 'Kenzhebek', 'nurlan.kenzhebek@email.kz', '7702-345-678',
-- 'Karaganda, Kazakhstan'),
-- ('4', 'Asel', 'Serikbayeva', 'asel.serikbayeva@email.kz', '7703-456-789',
-- 'Astana, Kazakhstan'),
-- ('5','Aidos', 'Tulegenov', 'aidos.tulegenov@email.kz', '7704-567-890', 'Aktobe,
-- Kazakhstan'),
-- ('6','Saule', 'Bektasova', 'saule.bektasova@email.kz', '7705-678-901',
-- 'Pavlodar, Kazakhstane'),
-- ('7','Alisher', 'Mukhanov', 'alisher.mukhanov@email.kz', '7706-789-012',
-- 'Taraz, Kazakhstan'),
-- ('8','Dana', 'Sadykova', 'dana.sadykova@email.kz', '7707-890-123', 'Kyzylorda,
-- Kazakhstan'),
-- ('9','Erzhan', 'Akhmetov', 'erzhan.akhmetov@email.kz', '7708-901-234',
-- 'Oskemen, Kazakhstan'),
-- ('10','Madina', 'Yessimova', 'madina.yessimova@email.kz', '777-012-3456',
-- 'Semey, Kazakhstan');


-- UPDATE Orders
-- SET BuyerID = B.BuyerID
-- FROM Buyer B
-- WHERE Orders.OrderID = B.BuyerID;


-- INSERT INTO Delivery (DeliveryID, DeliveryMethod, DeliveryStatus, DeliveryDate,
-- DeliveryCost, OrderID, FarmerID) VALUES
-- ('1','Yandex Taxi', 'Delivered', '2024-10-11', 10.00, 1, 1),
-- ('2','Air Cargo', 'Pending', '2024-10-05', 5.00, 2, 2);

