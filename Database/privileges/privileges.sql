-- Bookrary Database Privileges & User Access Control
-- Location: Database/privileges/privileges.sql

-- Grant permissions for Aiven Cloud admin user 'avnadmin'
GRANT ALL PRIVILEGES ON Bookrary.* TO 'avnadmin'@'%';

-- Create restricted application user role if needed
-- CREATE USER IF NOT EXISTS 'bookrary_app'@'%' IDENTIFIED BY 'BookrarySecureAppPass2026!';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON Bookrary.* TO 'bookrary_app'@'%';

FLUSH PRIVILEGES;
