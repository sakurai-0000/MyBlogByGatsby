import React from 'react'
import Style from './layout.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList } from "@fortawesome/free-solid-svg-icons"

function Slider(props) {
    return (
        <div className={Style.sidebar_wrap}>
            <div>
                <p><FontAwesomeIcon icon={faList} /> 目次</p>
            </div>
            <ul className={Style.ul}>
                <li>
                    {props.title}
                </li>
                <li>
                    <ul className=''>
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