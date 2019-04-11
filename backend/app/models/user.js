const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

let types = {
    values: ['ADMIN', 'USER', 'OTHER'],
    message: '{VALUE} no es un rol válido'
};

const user = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    lastname: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    image: {
        type: String,
        required: false
    },
    type: {
        type: String,
        default: 'USER',
        enum: types
    },
    status: {
        type: Boolean,
        default: true
    }
})

user.method.toJSON = function(){
    let user = this
    let userObject = user.toObject()
    delete userObject.password
    return userObject
}

user.plugin(uniqueValidator, { message: '{PATH} debe ser único'})

module.exports = mongoose.model('users',user)