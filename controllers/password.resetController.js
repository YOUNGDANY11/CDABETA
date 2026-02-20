const bcrypt = require('bcryptjs')
const path = require('path')
const { sendEmail } = require('../config/email.config')
const { generateNumericCode } = require('../utils/generateCodeResetPassword')
const { renderTemplateFile } = require('../utils/renderTemplate')
const userModel = require('../models/userModel')
const passwordModel = require('../models/password.resetModel')
const TTL_MINUTES = Number(process.env.RESET_CODE_TTL_MINUTES || 3)

const forgotPassword = async(req,res)=>{
    try{    
        const { email } = req.body
        if(!email) return res.status(400).json({error:'email es obligatorio'})
        const user = await userModel.getByEmail(email)
        if(user.length === 0){
            return res.status(200).json({
                mensaje:'Si el correo existe, se enviará un código de verificación para restablecer la contraseña.'
            })
        }
        const code = generateNumericCode(6)
        const code_hash = await bcrypt.hash(code, 10)
        const expires_at = new Date(Date.now() + TTL_MINUTES * 60 * 1000)
        await passwordModel.createReset(user[0].id_user, code_hash, expires_at)

        const templatePath = path.join(__dirname, '..', 'templates', 'emails', 'password-reset.email.html')
        const supportEmail = process.env.SUPPORT_EMAIL || process.env.GMAIL_USER || ''
        const html = await renderTemplateFile(templatePath, {
            APP_NAME: process.env.APP_NAME || 'CDA',
            CODE: code,
            TTL_MINUTES: TTL_MINUTES,
            SUPPORT_EMAIL: supportEmail,
            YEAR: new Date().getFullYear(),
        })

        await sendEmail({
            from: `"CDA" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: 'Código para restablecer tu contraseña',
            text: `Tu código de verificación es: ${code}\n\nEste código expira en ${TTL_MINUTES} minutos.\nSi no solicitaste este cambio, ignora este correo.`,
            html,
        })
        return res.status(200).json({
            mensaje:'Si el correo existe, se ha enviado un código de verificación para restablecer la contraseña.',
            minutos: TTL_MINUTES
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:'Error',
            mensaje:'Error al procesar la solicitud'
        })
    }
}

const resetPassword = async(req,res)=>{
    try{
        const { email, code, newPassword } = req.body
        if(!email || !code || !newPassword){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida toda la informacion'
            })
        }
        if(newPassword.length < 8){
            return res.status(400).json({
                status:'Error',
                mensaje:'La nueva contraseña debe tener al menos 8 caracteres'
            })
        }
        const user = await userModel.getByEmail(email)
        if(user.length === 0){
            return res.status(400).json({
                status:'Error',
                mensaje:'Código inválido o expirado'
            })
        }
        const reset = await passwordModel.getLatestValidReset(user[0].id_user)
        if(!reset){
            return res.status(400).json({
                status:'Error',
                mensaje:'Código inválido o expirado'
            })
        }
        const isValid = await bcrypt.compare(code, reset.code_hash)
        if(!isValid){
            return res.status(400).json({
                status:'Error',
                mensaje:'Código inválido o expirado'
            })
        }
        const passwordHash = await bcrypt.hash(newPassword, 10)
        await userModel.updatePassword(passwordHash, user[0].id_user)
        await passwordModel.invalidateAllForUser(user[0].id_user)
        return res.status(200).json({
            status:'Success',
            mensaje:'Contraseña restablecida'
        })
    }catch(error){
        console.error('Error en resetPassword:', error)
        return res.status(500).json({
            status:'Error', 
            mensaje:'Error al procesar la solicitud'
        })
    }
}

module.exports = {
    forgotPassword,
    resetPassword
}