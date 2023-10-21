import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import Error from '../Errors/Error';
import Loading from '../Loading/Loading';
import Details from '../Details/Details';

export default function Lists({url}) {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [details, setDetails] = useState();

    useEffect(() => {
        setLoading(true);
        fetch(`${url}users.json`)
        .then((response) => {
            if (!response.ok) {
                throw new Error()
            }
            return response.json()}) // ответ
        .then((result) => {
            setList(result);
            setError(null);
        })
        .catch((err) => {
            console.error(err);
            setError({state: true, text:err.message});

        })
        .finally(() => {
            setTimeout(() => {
                setLoading(false)}, 1000);
        })
    }, [url])

    function handlerId(id) {
        setDetails(id)
    }

    function getList() {
        return (
            <ul className='lists__box'>
               {list.map((el, index) => <li className={`list__item ${details === el.id ? 'selected' : ''}`} key={index} onClick={() => handlerId(el.id)}>{el.name}</li>)} 
            </ul>
        )
    }
    
    return (
        <div className='datails__list'>
            { (!loading && !error) ? getList() : <Loading />}
            {error && <Error error={error} />}
            {details && <Details url={url} id={details}/>}
        </div>
    )
}

Lists.propTypes = {
    url: PropTypes.string,
}
