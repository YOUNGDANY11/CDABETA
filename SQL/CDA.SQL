CREATE TABLE roles(
    id_role SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE users(
    id_user BIGSERIAL PRIMARY KEY,
    id_role INT NOT NULL DEFAULT 4 REFERENCES roles(id_role) ON DELETE CASCADE ON UPDATE CASCADE,
    name VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    document VARCHAR(10) NOT NULL UNIQUE,
    address VARCHAR(255),
    country VARCHAR(50),
    city VARCHAR(50),
    phone VARCHAR(20),
    contact_name VARCHAR(100),
    contact_phone VARCHAR(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE temporal_clients(
    id_temporal_client BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    document VARCHAR(10) NOT NULL,
    address VARCHAR(255) NOT NULL,
    country VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    contact_name VARCHAR(100) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    license TEXT,
    soat TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE vehicles_temporal_clients(
    id_vehicle_temporal_client BIGSERIAL PRIMARY KEY,
    id_temporal_client BIGINT NOT NULL REFERENCES temporal_clients(id_temporal_client) ON DELETE CASCADE ON UPDATE CASCADE,
    name VARCHAR(100) NOT NULL,
    plate VARCHAR(10) NOT NULL UNIQUE,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    color VARCHAR(20) NOT NULL,
    tipe VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE password_resets (
    id_reset SERIAL PRIMARY KEY,
    id_user BIGINT NOT NULL REFERENCES users(id_user) ON DELETE CASCADE ON UPDATE CASCADE,
    code_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE mechanics(
    id_mechanic BIGSERIAL PRIMARY KEY,
    id_user BIGINT NOT NULL REFERENCES users(id_user) ON DELETE CASCADE ON UPDATE CASCADE,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,  
    status VARCHAR(20) NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE vehicles(
    id_vehicle BIGSERIAL PRIMARY KEY,
    id_user BIGINT NOT NULL REFERENCES users(id_user) ON DELETE CASCADE ON UPDATE CASCADE,
    name VARCHAR(100) NOT NULL,
    plate VARCHAR(10) NOT NULL UNIQUE,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    color VARCHAR(20) NOT NULL,
    tipe VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE documents_users(
    id_document_user BIGSERIAL PRIMARY KEY,
    id_user BIGINT NOT NULL REFERENCES users(id_user) ON DELETE CASCADE ON UPDATE CASCADE,
    name VARCHAR(100) NOT NULL,
    tipe VARCHAR(50) NOT NULL,
    document TEXT not null,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE documents_vehicles(
    id_document_vehicle BIGSERIAL PRIMARY KEY,
    id_vehicle BIGINT NOT NULL REFERENCES vehicles(id_vehicle) ON DELETE CASCADE ON UPDATE CASCADE,
    name VARCHAR(100) NOT NULL,
    tipe VARCHAR(50) NOT NULL,
    document TEXT not null,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE technomecanics(
    id_technomechanic BIGSERIAL PRIMARY KEY,
    id_user BIGINT REFERENCES users(id_user) ON DELETE CASCADE ON UPDATE CASCADE,
    id_temporal_client BIGINT REFERENCES temporal_clients(id_temporal_client) ON DELETE CASCADE ON UPDATE CASCADE,
    id_mechanic BIGINT NOT NULL REFERENCES mechanics(id_mechanic) ON DELETE CASCADE ON UPDATE CASCADE,
    id_vehicle BIGINT REFERENCES vehicles(id_vehicle) ON DELETE CASCADE ON UPDATE CASCADE,
    documents_vehicle BIGINT REFERENCES documents_vehicles(id_document_vehicle) ON DELETE CASCADE ON UPDATE CASCADE, 
    description TEXT NOT NULL,
    last_service_date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE technomecanics_status(
    id_technomecanic_status BIGSERIAL PRIMARY KEY,
    id_technomechanic BIGINT NOT NULL REFERENCES technomecanics(id_technomechanic) ON DELETE CASCADE ON UPDATE CASCADE,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE technomecanics_photos(
    id_technomecanic_photo BIGSERIAL PRIMARY KEY,
    id_technomechanic BIGINT NOT NULL REFERENCES technomecanics(id_technomechanic) ON DELETE CASCADE ON UPDATE CASCADE,
    photo TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE technomecanics_documents(
    id_technomecanic_document BIGSERIAL PRIMARY KEY,
    id_technomechanic BIGINT NOT NULL REFERENCES technomecanics(id_technomechanic) ON DELETE CASCADE ON UPDATE CASCADE,
    name VARCHAR(100) NOT NULL,
    tipe VARCHAR(50) NOT NULL,
    document TEXT not null,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE notifications_technomecanics(
    id_notification_technomecanic BIGSERIAL PRIMARY KEY,
    id_technomechanic BIGINT NOT NULL REFERENCES technomecanics(id_technomechanic) ON DELETE CASCADE ON UPDATE CASCADE,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE preventive_notificationes(
    id_preventive_notification BIGSERIAL PRIMARY KEY,
    id_vehicle BIGINT NOT NULL REFERENCES vehicles(id_vehicle) ON DELETE CASCADE ON UPDATE CASCADE,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE contratcs(
    id_contract BIGSERIAL PRIMARY KEY,
    id_user BIGINT REFERENCES users(id_user) ON DELETE CASCADE ON UPDATE CASCADE,
    id_mechanic BIGINT REFERENCES mechanics(id_mechanic) ON DELETE CASCADE ON UPDATE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE contract_documents(
    id_contract_document BIGSERIAL PRIMARY KEY,
    id_contract BIGINT NOT NULL REFERENCES contratcs(id_contract) ON DELETE CASCADE ON UPDATE CASCADE,
    name VARCHAR(100) NOT NULL,
    tipe VARCHAR(50) NOT NULL,
    document TEXT not null,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


INSERT INTO roles (name, code) VALUES 
('Admin', 'ADMIN'),
('Manager', 'Gestor'),
('Mechanic', 'Mecanico'),
('User', 'USER');