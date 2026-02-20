const pool = require('../config/db')

const getAll = async()=>{
    const result = await pool.query('SELECT * FROM technomecanics')
    return result.rows
}

const getById = async(id_technomecanic)=>{
    const result = await pool.query('SELECT * FROM technomecanics WHERE id_technomecanic = $1',[id_technomecanic])
    return result.rows
}

const getByIdUser = async(id_user)=>{
    const result = await pool.query('SELECT * FROM technomecanics WHERE id_user = $1',[id_user])
    return result.rows
}

const create = async(id_user, id_temporal_client, id_mechanic, id_vehicle, documents_vehicle, description, last_service_date)=>{
    const result = await pool.query('INSERT INTO technomecanics (id_user, id_temporal_client, id_mechanic, id_vehicle, documents_vehicle, description, last_service_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [id_user, id_temporal_client, id_mechanic, id_vehicle, documents_vehicle, description, last_service_date])
    return result.rows[0]
}

const getMechanicById = async (id_mechanic) => {
    const result = await pool.query(
        `SELECT 
            mechanics.*, 
            users.name AS name_user, 
            users.lastname AS lastname_user,
            users.email AS user_email
         FROM mechanics
         INNER JOIN users 
            ON users.id_user = mechanics.id_user
         WHERE mechanics.id_mechanic = $1`,
        [id_mechanic]
    )
    return result.rows[0]
}

const getUserById = async (id_user) => {
    const result = await pool.query('SELECT * FROM users WHERE id_user = $1', [id_user])
    return result.rows[0]
}

module.exports = {
    getAll,
    getById,
    getByIdUser,
    create,
    getMechanicById,
    getUserById
}