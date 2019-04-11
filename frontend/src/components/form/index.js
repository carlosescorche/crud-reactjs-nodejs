import React from 'react'
import Upload from './file-upload'
import PropTypes from 'prop-types'
import Message from '../message'
import Form from '../../pages/add';

const types = ['USER','OTHER']

const Forma = (props) => (
            <form method="post" className="col-lg-8 mx-auto mb-4" onSubmit={(e) => props.handleSubmit(e)}>

                <Upload image={props.image} handleChange={props.handleFile}/>

                <div className="form-group row mt-4">
                    <div className="form-group col-md-6">
                        <label htmlFor="firstname">Nombre</label>
                        <input type="text" value={props.form.name} onChange={(event) => props.handleChange(event)} className="form-control" name="name" id="name" placeholder="Ingrese el nombre" required/>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="lastname">Apellido</label>
                        <input type="text" value={props.form.lastname} onChange={(event) => props.handleChange(event)} className="form-control" name="lastname" id="lastname" placeholder="Ingrese el apellido" required />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="form-group col-md-12">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" value={props.form.email} onChange={(event) => props.handleChange(event)} className="form-control" name="email" id="email" placeholder="Ingrese el E-mail" required/>
                    </div>
                </div>

                {
                    props.location.pathname === '/add' ? 
                
                        <div className="form-group row">
                            <div className="form-group col-md-6">
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" value={props.form.password} onChange={(event) => props.handleChange(event)} className="form-control" name="password" id="password" placeholder="Ingrese una Contraseña" required/>
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="type">Tipo</label>
                                <select className="form-control" value={props.form.type} onChange={(event) => props.handleChange(event)} name="type" id="type" required>
                                    <option value="">Selecciona una opción</option>
                                    {
                                        types.map((t,key) => <option value={t} key={key}>{t}</option>)
                                    }
                                </select>
                            </div>
                        </div>

                    :
                    
                        <div className="form-group row">
                            <div className="form-group col-md-12">
                                <label htmlFor="type">Tipo</label>
                                <select className="form-control" value={props.form.type} onChange={(event) => props.handleChange(event)} name="type" id="type" required>
                                    <option value="">Selecciona una opción</option>
                                    {
                                        types.map((t, key) => <option value={t} key={key}>{t}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                }

                <Message className="col-12 mt-3 p-0" message={props.message} handleClose={props.handleCloseMessage} />

                <div className="form-group row my-5">
                    <div className="col-lg-6 mx-auto">
                        <button className="btn btn-primary btn-block">Guardar</button>
                    </div>
                </div>
            </form>
)

Forma.propTypes = {
    form : PropTypes.object.isRequired,
    message : PropTypes.object.isRequired,
    handleChange : PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleFile: PropTypes.func.isRequired,
    handleCloseMessage: PropTypes.func.isRequired
}

export default Forma