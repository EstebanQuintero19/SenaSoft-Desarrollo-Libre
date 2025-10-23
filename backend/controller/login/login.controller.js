const Usuario = require('../../models/login/login.model.js');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const { cedula, email, password } = req.body;

    if (!password || (!cedula && !email)) {
        return res.status(400).json({ message: 'Debe enviar password y (cedula o email)' });
    }

    try {
        const usuario = await Usuario.findOne({cedula:cedula});

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const ok = await bcrypt.compare(password, usuario.password);
        if (!ok) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const { password: _, ...safe } = usuario.toObject();
        res.status(200).json({ message: 'Login exitoso', usuario: safe });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

const register = async (req, res) => {
    const { cedula, nombre, apellido, email, telefono, tipoDocumento, genero, password } = req.body;

    // Validaciones básicas
    if (!cedula || !nombre || !apellido || !email || !telefono || !tipoDocumento || !password) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }
    if (!['CC', 'TI', 'CE'].includes(tipoDocumento)) {
        return res.status(400).json({ message: 'tipoDocumento inválido (CC|TI|CE)' });
    }
    if (genero && !['Masculino', 'Femenino', 'Otro'].includes(genero)) {
        return res.status(400).json({ message: 'género inválido (Masculino|Femenino|Otro)' });
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
        return res.status(400).json({ message: 'Email inválido' });
    }
    if (String(password).length < 6) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    try {
        // Evitar duplicados manualmente (además del índice unique)
        const existe = await Usuario.findOne({ $or: [{ cedula }, { email }] });
        if (existe) {
            return res.status(409).json({ message: 'Ya existe un usuario con esa cédula o email' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const nuevoUsuario = new Usuario({
            cedula,
            nombre,
            apellido,
            email,
            telefono,
            tipoDocumento,
            genero,
            password: hash // fechaCreacion se setea por defecto
        });

        await nuevoUsuario.save();

        const safe = nuevoUsuario.toObject();
        delete safe.password;

        res.status(201).json({ message: 'Usuario registrado exitosamente', usuario: safe });
    } catch (error) {
        console.error('Error en el registro:', error);

        // Duplicados por índice único
        if (error && error.code === 11000) {
            const campo = Object.keys(error.keyPattern || {})[0] || 'campo único';
            return res.status(409).json({ message: `Duplicado en ${campo}` });
        }

        res.status(500).json({ message: 'Error en el servidor' });
    }
};

const getUsers = async(req,res)=>{
    try {
        const users = Usuario.find()
        res.json(users)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { login, register, getUsers};