import React from 'react'
import {observer,inject} from 'mobx-react'
import {Link} from 'react-router-dom'
import IconList from '../components/icons/list'
import Forma from '../components/form'

@inject('store')
@observer
class Form extends React.Component{
    
    state = {
        image: null,
        form: {
            name: '',
            lastname: '',
            email: '',
            password: '',
            type: '',
            file: null
        },
        message: {
            type: '',
            text: '',
            show: false
        }
    }

    render = () => {
        return(<section className="py-5 home">
            <div className="container">
                <div className="my-5 card">
                    <div className="card-body">
                        <div className="row py-3">
                            <div className="col-sm-6 d-flex justify-content-center justify-content-sm-start align-items-center"><h1 className="display-4 mb-4 mb-sm-0">Agregar Usuarios</h1></div>
                            <div className="col-sm-6 d-flex justify-content-center justify-content-sm-end"><Link to="/" className="btn btn-primary"><IconList color="#fff" size="20px" className="mr-1" />Volver al Listado</Link></div>
                        </div>

                        <div className="row mt-5">
                            <Forma 
                            {...this.state}
                            {...this.props}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                            handleFile={this.handleFile}
                            handleCloseMessage={this.handleCloseMessage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>)
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(state => ({
            form: Object.assign(state.form, { [name]: value })
        }))
    }

    handleFile = (file, data) => {
        this.setState({ form: { ...this.state.form, 'file': file }, image: data })
    }

    handleSubmit = (event) => {
        let { usersStore } = this.props.store
        usersStore
            .saveUser(this.state.form)
            .then(res => {
                this.setState(state => ({
                    form: { name: '', lastname: '', email: '', password: '', type: '', file: null },
                    message: { type: 'success', text: 'El usuario se registro con éxito', show: true },
                    image: null
                }))
            })
            .catch(err => {
                if (!err.ok && err.err.message)
                    this.setState({ 'message': { type: 'danger', text: err.err.message, show: true } })
            })
        event.preventDefault()
    }

    handleCloseMessage = () => {
        this.setState({ 'message': { type: '', text: '', show: false } })
    }

}

export default Form