import React from 'react'
import PropTypes from 'prop-types'
import IconAvatar from '../icons/avatar'
import Message from '../message'
import {FILE_SIZE_LIMIT} from '../../constants/app'

class FileUpload extends React.Component {

	state = {
		message: { type: '', text: '', show: false }        
	}

	render(){
		return(
			<div className="form-group row">
				<div className="col-sm-3">
					{
						!this.props.image ? 
							<IconAvatar size="90px" className="''" />
						:
						<div className="image xl">
						   <img src={this.props.image} alt="avatar"/>
						</div>
					}
				</div>
				<div className="col-sm-9 d-flex flex-column justify-content-center align-items-center align-items-lg-start">
					<div className="btn-file py-2">
						<input type="file" className="btn-file-input" accept="image/jpg,image/png,image/jpeg" id="customFile" name="avatar" onChange={this.handleUpload} />
						<label className="btn btn-primary m-0" htmlFor="customFile">Seleccionar Imagen</label>
					</div>
				</div>

				<Message className="col-12 mt-3" message={this.state.message} handleClose={this.handleCloseMessage}/>
			</div>
		)
	}

	handleCloseMessage = () => {
		this.setState({ 'message': { type: '', text: '', show: false } })
	}

	handleUpload = (event) => {
		if ((event.target.files[0].size / 1024) > FILE_SIZE_LIMIT) {
			this.setState({ 'message': { type: 'danger', text: `La imagen debe pesar menos de ${FILE_SIZE_LIMIT}KB`, show: true } })
			return false
		}

		if (event.target.files && event.target.files[0]) {
			if ((event.target.files[0].type === "image/jpeg" || event.target.files[0].type === "image/png" || event.target.files[0].type === "image/jpg")) {

				let file = event.target.files[0]
				let reader = new FileReader()
				let ref = this

				reader.addEventListener("load", function () {
					ref.props.handleChange(file, reader.result)
				}, false);

				if (file) {
					reader.readAsDataURL(file);
				}
			}
			else {
				this.setState({ 'message': { type: 'danger', text: 'El archivo debe ser una imagen', show: true } })
			}
		}

		event.preventDefault();
	}
}

FileUpload.propTypes = {
	handleChange : PropTypes.func.isRequired
}

export default FileUpload