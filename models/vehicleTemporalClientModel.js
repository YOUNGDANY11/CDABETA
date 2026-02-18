const pool = require('../config/db')

const getAll = async () => {
    const result = await pool.query('SELECT * FROM vehicles_temporal_clients')
    return result.rows
}

const getById = async(id_vehicle_temporal_client) => {
    const result = await pool.query('SELECT * FROM vehicles_temporal_clients WHERE id_vehicle_temporal_client = $1', [id_vehicle_temporal_client])
    return result.rows[0]
}

const getByPlate = async(plate) => {
    const result = await pool.query('SELECT * FROM vehicles_temporal_clients WHERE plate = $1', [plate])
    return result.rows[0]
}

const create = async(id_temporal_client,name,plate,brand,model,year,color,tipe) => {
    const result = await pool.query(
        'INSERT INTO vehicles_temporal_clients (id_temporal_client,name,plate,brand,model,year,color,tipe) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
        [id_temporal_client,name,plate,brand,model,year,color,tipe]
    )
    return result.rows[0]
}

const update = async(name,plate,brand,model,year,color,tipe,id_vehicle_temporal_client) => {
    const result = await pool.query(
        'UPDATE vehicles_temporal_clients SET name = $1, plate = $2, brand = $3, model = $4, year = $5, color = $6, tipe = $7, updated_at = NOW() WHERE id_vehicle_temporal_client = $8 RETURNING *',
        [name,plate,brand,model,year,color,tipe,id_vehicle_temporal_client]
    )
    return result.rows[0]
}

const deleteVehicleTemporalClient = async(id_vehicle_temporal_client) => {
    const result = await pool.query('DELETE FROM vehicles_temporal_clients WHERE id_vehicle_temporal_client = $1 RETURNING *', [id_vehicle_temporal_client])
    return result.rows[0]
}

module.exports = {
    getAll,
    getById,
    getByPlate,
    create,
    update,
    deleteVehicleTemporalClient
}