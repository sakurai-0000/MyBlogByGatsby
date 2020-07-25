import React from 'react'
import Style from './layout.module.scss'

function Slider(props) {
    return (
        <div className={Style.sidebar_wrap}>
            <ul className={Style.ul}>
                <li>
                    <a href='/'>{props.title}</a>
                </li>
                <li>
                    <ul className={Style.sidebar_wrap}>
                        {props.links.map((item, i) => {
                            return <li key={i} className=''>
                                <a href={`#${item.id}`} key={i}>{item.text}</a>
                            </li>
                        })}
                    </ul>
                </li>
            </ul>
        </div >
    );
}

export default Slider;