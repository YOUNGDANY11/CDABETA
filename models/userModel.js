const pool = require('../config/db')

const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users')
    return result.rows
}

const getUserById = async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    return result.rows[0]
}

const getByName = async (name) => {
    const result = await pool.query('SELECT * FROM users WHERE name ILIKE $1', [`%${name}%`])
    return result.rows
}

const getByLastname = async (lastname) => {
    const result = await pool.query('SELECT * FROM users WHERE lastname ILIKE $1', [`%${lastname}%`])
    return result.rows
}

const getByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email ILIKE $1', [`%${email}%`])
    return result.rows
}

const getByDocument = async (document) => {
    const result = await pool.query('SELECT * FROM users WHERE document ILIKE $1', [`%${document}%`])
    return result.rows
}

const getByPhone = async (phone) => {
    const result = await pool.query('SELECT * FROM users WHERE phone ILIKE $1', [`%${phone}%`])
    return result.rows
}

const registerUser = async(id_role,email,password,document)=>{
    const result = await pool.query('INSERT INTO users (id_role,email,password,document) VALUES ($1,$2,$3,$4) RETURNING *', [id_role,email,password,document])
    return result.rows[0]
}

const create = async(id_role,name,lastname,email,hashedPassword,document,address,country,city,phone,contact_name,contact_phone) => {
    const result = await pool.query(
        'INSERT INTO users (id_role,name,lastname,email,password,document,address,country,city,phone,contact_name,contact_phone) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *',
        [id_role,name,lastname,email,hashedPassword,document,address,country,city,phone,contact_name,contact_phone]
    )
    return result.rows[0]
}

const update = async(id_role,name,lastname,email,document,address,country,city,phone,contact_name,contact_phone,id_user) => {
    const result = await pool.query(
        'UPDATE users SET id_role = $1, name = $2, lastname = $3, email = $4, document = $5, address = $6, country = $7, city = $8, phone = $9, contact_name = $10, contact_phone = $11 WHERE id_user = $12 RETURNING *',
        [id_role,name,lastname,email,document,address,country,city,phone,contact_name,contact_phone,id_user]
    )
    return result.rows[0]
}

const updatePassword = async (hashedPassword, id_user) => {
    const result = await pool.query('UPDATE users SET password = $1 WHERE id_user = $2 RETURNING *', [hashedPassword, id_user])
    return result.rows[0]
}

const deleteUser = async (id_user) => {
    const result = await pool.query('DELETE FROM users WHERE id_user = $1 RETURNING *', [id_user])
    return result.rows[0]
}

module.exports = {  
    getAllUsers,
    getUserById,
    getByName,
    getByLastname,
    getByEmail,
    getByDocument,
    getByPhone,
    registerUser,
    create,
    update,
    updatePassword,
    deleteUser
}