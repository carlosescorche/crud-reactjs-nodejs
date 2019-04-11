import UsersStore from './users-store'
import MsgStore from './msg-store'

class rootStore{
    constructor(){
        this.usersStore = new UsersStore(this)
        this.msgStore = new MsgStore(this)
    }
}

export default rootStore

