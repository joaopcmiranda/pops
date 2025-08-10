-- Initialize PostgreSQL schemas for POps microservices
-- Each service gets its own schema for logical separation

-- Create schemas
CREATE SCHEMA IF NOT EXISTS trip_service;
CREATE SCHEMA IF NOT EXISTS user_service;
CREATE SCHEMA IF NOT EXISTS itinerary_service;

-- Grant permissions to the database user
GRANT ALL PRIVILEGES ON SCHEMA trip_service TO pops_user;
GRANT ALL PRIVILEGES ON SCHEMA user_service TO pops_user;
GRANT ALL PRIVILEGES ON SCHEMA itinerary_service TO pops_user;

-- For test database, also grant to test user
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'pops_test_user') THEN
        GRANT ALL PRIVILEGES ON SCHEMA trip_service TO pops_test_user;
        GRANT ALL PRIVILEGES ON SCHEMA user_service TO pops_test_user;
        GRANT ALL PRIVILEGES ON SCHEMA itinerary_service TO pops_test_user;
    END IF;
END $$;

-- Set default search path to include all schemas (optional)
-- This allows cross-schema queries when needed for integration tests
-- Individual services will set their search path to their specific schema