const pool = require('../config/db')

const getAll = async()=>{
    const results = await pool.query('SELECT * FROM temporal_clients')
    return results.rows
}

const getById = async(id_temporal_client)=>{
    const result = await pool.query('SELECT * FROM temporal_clients WHERE id_temporal_client = $1', [id_temporal_client])
    return result.rows[0]
}

const getByName = async(name)=>{
    const result = await pool.query('SELECT * FROM temporal_clients WHERE name ILIKE $1', [`%${name}%`])
    return result.rows
}

const getByLastName = async(lastname)=>{
    const result = await pool.query('SELECT * FROM temporal_clients WHERE lastname ILIKE $1', [`%${lastname}%`])
    return result.rows
}

const getByEmail = async(email)=>{
    const result = await pool.query('SELECT * FROM temporal_clients WHERE email ILIKE $1', [`%${email}%`])
    return result.rows
}

const getByEmailExact = async(email)=>{
    const result = await pool.query('SELECT * FROM temporal_clients WHERE email = $1', [email])
    return result.rows[0]
}

const getByDocument = async(document)=>{
    const result = await pool.query('SELECT * FROM temporal_clients WHERE document ILIKE $1', [`%${document}%`])
    return result.rows
}

const getByDocumentExact = async(document)=>{
    const result = await pool.query('SELECT * FROM temporal_clients WHERE document = $1', [document])
    return result.rows[0]
}

const getByPhone = async(phone)=>{
    const result = await pool.query('SELECT * FROM temporal_clients WHERE phone ILIKE $1', [`%${phone}%`])
    return result.rows
}

const create = async(name,lastname,email,document,address,country,city,phone,contact_name,contact_phone) => {
    const result = await pool.query(
        'INSERT INTO temporal_clients (name,lastname,email,document,address,country,city,phone,contact_name,contact_phone) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *',
        [name,lastname,email,document,address,country,city,phone,contact_name,contact_phone]
    )
    return result.rows[0]
}

const updateLicense = async(license,id_temporal_client) => {
    const result = await pool.query(
        'UPDATE temporal_clients SET license = $1, updated_at = NOW() WHERE id_temporal_client = $2 RETURNING *',
        [license,id_temporal_client]
    )
    return result.rows[0]
}

const updateSoat = async(soat,id_temporal_client) => {
    const result = await pool.query(
        'UPDATE temporal_clients SET soat = $1, updated_at = NOW() WHERE id_temporal_client = $2 RETURNING *',
        [soat,id_temporal_client]
    )
    return result.rows[0]
}

const update = async(name,lastname,email,document,address,country,city,phone,contact_name,contact_phone,id_temporal_client) => {
    const result = await pool.query('UPDATE temporal_clients SET name = $1,lastname = $2,email = $3,document = $4,address = $5,country = $6,city = $7,phone = $8,contact_name = $9,contact_phone = $10, updated_at = NOW() WHERE id_temporal_client = $11 RETURNING *',
    [name,lastname,email,document,address,country,city,phone,contact_name,contact_phone,id_temporal_client])
    return result.rows[0]
}

const deleteTemporalClient = async(id_temporal_client) => {
    const result = await pool.query('DELETE FROM temporal_clients WHERE id_temporal_client = $1 RETURNING *', [id_temporal_client])
    return result.rows[0]
}

module.exports = {
    getAll,
    getById,
    getByName,
    getByLastName,
    getByEmail,
    getByEmailExact,
    getByDocument,
    getByDocumentExact,
    getByPhone,
    create,
    updateLicense,
    updateSoat,
    update,
    deleteTemporalClient
}