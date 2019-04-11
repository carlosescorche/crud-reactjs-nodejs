const express = require('express')
const bcrypt = require('bcrypt')
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const _ = require('lodash')
const router = express.Router()
const User = require('../models/user')

router.use(fileUpload())

// Listar usuarios
router.get('/', (req, res) => {
    
    const limit = req.query.limit || 10
    const skip = req.query.skip || 0

    User.find({status:true},'name lastname email image type status').skip(parseInt(skip)).limit(parseInt(limit)).exec((err,users) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        User.count({ status: true },(err,count)=>{
            return res.json({
                ok:true,
                count,
                users
            })
        })

    })
})

// Obtener usuario por ID
router.get('/:id',(req,res) => {
    const id = req.params.id
    
    User.findById(id, 'name lastname email image type status',(err,userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        } 

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                err: 'Usuario no encontrado'
            })
        } 

        return res.json({
            ok: true,
            user : userDB
        })
    })
})

// Modificar usuario
router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = _.pick(req.body,['name','lastname','email','type'])

    User.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true, context: 'query'},(err,userdb) => {
        if(err){
            return res.status(400).json({
                ok:false,
                err:err
            })
        }

        return res.json({
            ok:true,
            user:userdb
        })
    })
})

// Eliminar usuario
router.delete('/:id', (req, res) => {
    
    const id = req.params.id

    User.findByIdAndUpdate(id, { $set: { status: false } }, { new: true }, (err, userdb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        if(!userdb){
            return res.status(404).json({
                ok:false,
                err:'Usuario no encontrado'
            })
        }

        return res.json({
            ok: true,
            user: userdb
        })
    })

})

// Crear usuario
router.post('/', (req, res) => {
    const body = req.body

    const user = new User({
        name : body.name,
        lastname: body.lastname,
        email : body.email,
        password: bcrypt.hashSync(body.password, 10),
        type:body.type
    })

    user.save((err,userdb) => {
        if(err){
            return res.status(400).json({ok:false,err})
        }

        return res.json({
            ok:true,
            user:userdb
        })
    })
})

// Subir archivo y asignarlo a usuario
router.put('/upload/:id', function (req, res) {

    let id = req.params.id;

    if (!req.files) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'No se ha seleccionado ningún archivo'
                }
            });
    }

    let file = req.files.file;
    let name_split = file.name.split('.');
    let extention = name_split[name_split.length - 1];

    // Extensiones permitidas
    let exts = ['png', 'jpg', 'gif', 'jpeg'];

    if (exts.indexOf(extention) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones permitidas son ' + exts.join(', '),
                ext: extension
            }
        })
    }

    let name = `${id}-${new Date().getMilliseconds()}.${extention}`;

    file.mv(path.resolve(__dirname,`../../uploads/users/${name}`), (err) => {

        if (err)
            return res.status(500).json({
                ok: false,
                err
            });

        
        User.findById(id, (err, userDB) => {

            if (err) {
                removeFile(name, 'users');

                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!userDB) {

                removeFile(name, 'users');

                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'Usuario no existe'
                    }
                });
            }

            removeFile(userDB.image, 'users')

            userDB.image = name;

            userDB.save((err, userSaved) => {

                res.json({
                    ok: true,
                    user: userSaved,
                    image: name
                });
            });
        });
    });
});

// Obtener imagen del usuario
router.get('/image/:img', (req, res) => {

    let img = req.params.img;

    let pathImagen = path.resolve(__dirname, `../../uploads/users/${img}`);

    console.log(pathImagen);

    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        res.status(404).json({
            ok:false,
            err:{
                message:'Imagen no encontrada'
            }
        })
    }
});

// eliminar archivo
function removeFile(name) {

    let pathImagen = path.resolve(__dirname, `../../uploads/users/${name}`);
    
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}

module.exports = router
