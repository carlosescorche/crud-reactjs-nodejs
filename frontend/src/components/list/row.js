import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
import DeleteIcon from '../icons/delete'
import EditIcon from '../icons/edit'
import Avatar from '../icons/avatar'
import {URI_BACKEND} from '../../constants/app'
const Row = observer(({user,handleDelete}) => (
	<tr>
		<td>
			<div className="checkbox">
				
				<input type="checkbox" className="checkbox-input" checked={user.selected} onChange={() => {user.toggle(!user.selected)}} ></input>
				
				<span className="checkbox-span"></span>
			</div>
		</td>
		<td>{user.status}</td>
		<td>
			<div className="d-flex flex-row ">
				<div className="image md mr-2">
					{user.image ?
						<img src={`${URI_BACKEND}/users/image/${user.image}`} alt=""/>
						:
						<Avatar size='50px'/>
					}
				</div>

				{user.fullName}
			</div>
		</td>
		<td>{user.email}</td>
		<td>{user.type}</td>
		<td className="text-right">
			{
				!user.type != "admin" &&

				<Link to={`/edit/${user.id}`}>
					<EditIcon color="#686868" size="20px" className="mr-2" />
				</Link>
			}

			<a href="/" onClick={(e) => { user.remove(); e.preventDefault(); }}>
				<DeleteIcon color="#686868" size="20px" className="ml-2" />
			</a>
		</td>
	</tr>
))

Row.propTypes = {
	user : PropTypes.object.isRequired
}

export default Row