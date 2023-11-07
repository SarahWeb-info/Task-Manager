import React from 'react'
import PropTypes from 'prop-types'

export default function Icon(props) {
    const content = props.txt === null ? props.img : props.txt;
    return (
    <div className='icon' style={{width : props.size , height : props.size , background : props.bg }}>
        <a href="http://" style={{color : props.color ,fontSize : props.fontSize}}>
            {content}
        </a>                
    </div>
  )
}
Icon.propTypes = {
    size: PropTypes.string , 
    color : PropTypes.string , 
    bg : PropTypes.string , 
    fontSize : PropTypes.string , 
    txt : PropTypes.string , 
    img : PropTypes.string,
    imgAlt : PropTypes.string
}
Icon.defaultProps = {
    size: '3.5vw' , 
    color : 'white' , 
    bg : 'black' , 
    fontSize : '16px' , 
    txt : 'NULL' , 
    img : 'NULL',
    imgAlt : "Sarahweb for best Applications"
}

