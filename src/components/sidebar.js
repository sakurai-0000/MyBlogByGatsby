import React from 'react'

function Slider(props) {
    return(
        <div className="">
            <p>{props.title}</p>
            <ul className=''>
                {props.links.map((item, i) => {
                    return <li key={i} className=''>
                        <a href={`#${item.id}`} key={i}>{item.text}</a>
                    </li>
                })}
            </ul>
        </div>
    );
}

export default Slider;