import React from 'react'
import { observer, inject } from 'mobx-react'
import {Link} from 'react-router-dom'

import IconUser from '../components/icons/user'
import List from '../components/list'
import Paginator from '../components/pagination'
import Message from '../components/message'

@inject('store')
@observer
class Listed extends React.Component{
    
    componentDidMount(){
        this.props.store.usersStore.getUsers()
    }

    componentDidUpdate(prevProp){
        if(prevProp.location !== this.props.location){
            this.handleFetch()
        }
    }

    handleFetch = () => {
        let params = new URLSearchParams(this.props.location.search)
        let { usersStore } = this.props.store
        let page = params.has('page') ? params.get('page') : 1
        usersStore.getUsers(page)
    }

    handleSelect = (e) =>{
        this.props.store.usersStore.toggleAll(e.target.checked)
    }

    handleDeleteAll = (event) => {
        this.props.store.usersStore.deleteUsers()
        event.preventDefault()
    }

    handleCloseMsg = (event) => {
        this.props.store.msgStore.desactivate()
    }

    render(){
        const {usersStore,msgStore} = this.props.store
        const {items,total,page,limit} = usersStore.list

        return(
            <section className="pt-5 home">
                <div className="container">
                    <div className="mt-5 card">
                        <div className="card-body">
                            <div className="row py-3">
                                <div className="col-sm-6 d-flex justify-content-center justify-content-sm-start align-items-center"><h1 className="display-4 mb-4 mb-sm-0">Gestión de Usuarios</h1></div>
                                <div className="col-sm-6 d-flex justify-content-center justify-content-sm-end"><Link to="/add" className="btn btn-primary"><IconUser color="#fff" size="20px" className="mr-1"/> Agregar</Link></div>
                            </div>

                            <div className="mt-5 row">
                                <Message message={msgStore.message} handleClose={this.handleCloseMsg} className='col-12'/>    

                                <div className="col-12">
                                    <List list={items} 
                                        selectedAll={usersStore.selectedAll} 
                                        handleSelect={this.handleSelect} 
                                        className={usersStore.state !== 'resolve' ? 'loading' : ''}/>
                                </div>
                            </div>

                            <div className="row mt-4 mb-2 d-flex align-items-center">
                                <div className="col-6">
                                    <a href="/" onClick={(e) => {this.handleDeleteAll(e)}} className="mr-3">Eliminar</a>
                                    <span>{items.length} Usuarios</span>
                                </div>

                                <div className="col-6 d-flex justify-content-end">
                                   <Paginator total={total} page={page} perPage={limit} className={usersStore.state !== 'resolve' ? 'disabled' : ''}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Listed