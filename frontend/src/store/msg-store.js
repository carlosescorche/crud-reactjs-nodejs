import {observable,action} from 'mobx'

class Msg_store{
    
    @observable message = {
        type : '',
        text: '',
        show : false
    }

    constructor(rootStore){
        this.rootStore = rootStore
    }


    @action activate(text,type){
        let obj = this

        obj.message = {
            type,
            text,
            show:true
        }

        setTimeout(function(){
            obj.desactivate()
        },4000)
    }
    

    @action desactivate(){
        this.message = {
            type: '',
            text: '',
            show: false
        }
    }
}

export default Msg_store