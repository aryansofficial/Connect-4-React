import { toast} from 'react-toastify'
import React from 'react'


const Icon = ({title='Null',className=''}) => (
    <div>
        <div className={'circle '+className}>
            {/* {title} */}
        </div>
    </div>
)


const Button = ({title='Null'}) => (
    <div className='enter-button' title='drop your discs?'>
        {title}
    </div>
)





const Message = ({type, message}) => {
    console.log('FROM MESSAGE ',type, message)
    switch (type) {
        case 'success':
            return toast(message,{
                type: type ,
		className: 'reloaded',
                position: toast.POSITION.BOTTOM_RIGHT
            })
        case 'error':
            return toast(message,{
                type: type ,
                position: toast.POSITION.BOTTOM_RIGHT 
            })
        default:
            return toast(message,{
                type: '' ,
                position: toast.POSITION.BOTTOM_RIGHT ,
                className:'game-message toast',
                autoClose: 8000                
            })
            break;
    }
}




// const ReloadButton


export { Icon, Button, Message };
