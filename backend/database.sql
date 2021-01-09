CREATE DATABASE user_list;


CREATE TABLE employeeusers(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_address VARCHAR(255) DEFAULT '',
    isemployer BOOLEAN DEFAULT false,
    address_long DOUBLE PRECISION DEFAULT 0.0,
    address_lat DOUBLE PRECISION DEFAULT 0.0  );

CREATE TABLE employer(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_address VARCHAR(255) NOT NULL,
    isemployer BOOLEAN DEFAULT true,
    address_long DOUBLE PRECISION DEFAULT 0.0,
    address_lat DOUBLE PRECISION DEFAULT 0.0, );
)
