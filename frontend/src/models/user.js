import {observable,action} from 'mobx'

class User {
	
	id = ''
	name = ''
	lastname = ''
	email = ''
	image = null
	status_default = ''
	type_default = ''

	@observable selected = false 

	constructor(store,obj){
		this.store = store
		this.id = obj._id
		this.name = obj.name
		this.lastname = obj.lastname
		this.email = obj.email
		this.image = obj.image ? obj.image: null
		this.status_default = obj.status
		this.type_default = obj.type
	}

	get fullName(){
		return `${this.name.charAt(0).toLocaleUpperCase() + this.name.slice(1)} ${this.lastname.charAt(0).toLocaleUpperCase() + this.lastname.slice(1)}`
	}

	get status(){
		return this.status_default ? 'Activo' : 'Desactivado'
	}

	get type(){
		return this.type_default = this.type_default.toLocaleLowerCase()
	}

	@action toggle(value){
		this.selected = value
	}

	@action remove(){
		this.store.deleteUser(this.id)
	}
}

export default User