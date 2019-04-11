import React from 'react'
import PropTypes from 'prop-types'

const Message = ({message,className,handleClose}) => {

    if (!message.show)
        return null
    
        
    return (
        <div className={className}>
            <p className={['alert m-b-md animated', 'alert-' + message.type].join(' ')}>
                <button type="button" className="close" onClick={(event) => handleClose(event)}><span>&times;</span></button>
                <span>{message.text}</span>
            </p>
        </div>
    )
}

Message.defaultProps = {
    className : ''
}

Message.propTypes = {
    className : PropTypes.string,
    message : PropTypes.object.isRequired,
    handleClose : PropTypes.func.isRequired 
}

export default Message