import React from 'react'
import Row from './row'
import PropTypes from 'prop-types'

let Table = (props) => {
    return(<div className={['table-responsive',props.className].join(" ")}>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col" width="5%">
                        <div className="checkbox">
                            <input type="checkbox" className="checkbox-input" checked={props.selectedAll} onChange={(e) => {props.handleSelect(e)}}></input>
                            <span className="checkbox-span"></span>
                        </div>
                    </th>
                    <th scope="col" width="15%">Estado</th>
                    <th scope="col" width="27%">Usuario</th>
                    <th scope="col" width="27%">E-mail</th>
                    <th scope="col" width="15%">Tipo</th>
                    <th scope="col" width="10%">Opciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.list.length > 0 ?

                        props.list.map((user) => (
                            <Row user={user} key={user.id} handleDelete={props.handleDelete}/>
                        ))
                    :

                    <tr>
                        <td colSpan="6" className="text-center">No hay registros</td>
                    </tr>
                }
                
            </tbody>
        </table>
    </div>)
}

Table.defaultProps = {
    className : ''
}

Table.propTypes = {
    className: PropTypes.string,
    list : PropTypes.array.isRequired,
    selectedAll : PropTypes.bool.isRequired
}

export default Table