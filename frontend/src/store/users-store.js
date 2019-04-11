import {observable, action, flow} from 'mobx'
import {URI_BACKEND} from '../constants/app'
import User from '../models/user'

class UsersStore{
	
	@observable list = {
		items : [],
		page : 1,
		limit: 5,
		total : 0
	}

	@observable selectedAll = false
	@observable state = null //pending,resolve,error

	constructor(rootStore){
		this.rootStore = rootStore
	}

	//Obtener usuarios
	fetchUsers = flow(function * (page=null){
		this.selectedAll = false
		this.state = 'pending'

		page = page ? parseInt(page) - 1 : this.list.page - 1
		
		let limit = this.list.limit
		let skip = page * limit
		
		try{   
			let response = yield fetch(`${URI_BACKEND}/users?skip=${skip}&limit=${limit}`)
			
			if (!response.ok)
				throw new Error('Error obteniendo los usuarios')

			let json = yield response.json()
			
			this.list.items = json.users.map( user => new User(this,user) );
			this.list.total = json.count
			this.list.page = page + 1
			this.state = 'resolve'

		}catch(e){
			this.state = 'resolve'
			this.rootStore.msgStore.activate(e.message, 'danger')
		}
	})

	// Guardar usuario
	saveUser = flow(function * (data){
		
		let response,json
		let formdata = new FormData()

		for(let key in data){
			formdata.append(key,data[key])
		}

		response = yield fetch(`${URI_BACKEND}/users/`, { method: 'POST',body: formdata })

		json = yield response.json()
		
		if (!response.ok)
			throw Object.assign(json,{status : response.status})
		
		if(data['file'] === null) return 'registro exitoso';

		response = yield fetch(`${URI_BACKEND}/users/upload/${json.user._id}`, { method: 'PUT',body: formdata})

		json = yield response.json()

		if (!response.ok)
			throw Object.assign(json, { status: response.status })

		return 'registro exitoso';
	})


	//Editar usuario
	editUser = flow(function* (id,data) {

		let response, json
		let formdata = new FormData()

		for (let key in data) {
			formdata.append(key, data[key])
		}

		response = yield fetch(`${URI_BACKEND}/users/${id}`, { method: 'PUT', body: formdata })

		json = yield response.json()

		if (!response.ok)
			throw Object.assign(json, { status: response.status })

		if (data['file'] === null) return 'registro exitoso';

		response = yield fetch(`${URI_BACKEND}/users/upload/${json.user._id}`, { method: 'PUT', body: formdata })

		json = yield response.json()

		if (!response.ok)
			throw Object.assign(json, { status: response.status })

		return 'registro exitoso';
	})


	// Eliminar usuario
	deleteUser = flow(function * (id) {
		this.state = 'pending'

		try{
			let response = yield fetch(`${URI_BACKEND}/users/${id}`,{ method: 'DELETE' })
			
			let json = yield response.json()

			if(!response.ok && response.status == 400){
				throw new Error(json.err.message)
			}	
			
			this.fetchUsers()
		}catch(e){
			this.state = 'resolve'
			this.rootStore.msgStore.activate(e.message, 'danger')
		}
	})


	//Obtener usuario por id
	activateUser = flow(function * (id){
		let response = yield fetch(`${URI_BACKEND}/users/${id}`)

		let json = yield response.json()

		if (!response.ok)
			throw Object.assign(json,{status : response.status})
		
		return new User(this,json.user)
	})

	@action deleteUsers(){
		this.list.items.forEach(user => {
			if(user.selected)
				this.deleteUser(user.id)
		})

		this.selectedAll = false
	}

	@action getUsers(page){
		this.fetchUsers(page)
	}

	@action toggleAll(value){
		this.selectedAll = value
		this.list.items.forEach(user => {
			user.toggle(value)
		})
	}

	
}

export default UsersStore