import React from 'react'

const PageTitle = (props) => {
    return <div className="pageTitle">
        <h1>{props.title}</h1>
        {props.hasOwnProperty('subtitle') ? <p>{props.subtitle}</p> : ''}
    </div>
}

export default PageTitle