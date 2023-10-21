import React, { useState, useEffect} from 'react';
import PropTypes from "prop-types";
import Loading from '../Loading/Loading';
import Error from '../Errors/Error';

export default function Details(props) {
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({ details: {}});
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        if (!props.id) {
            return
        }

        try {
        fetch(`${props.url}${props.id}.json`)
        .then((response) => { 
            if (!response.ok) {
                throw new Error('Something went wrong...');
            }
            return response.json()})
        .then((result) => {
            setDetails(result);
            setLoading(false);
            setError(null);
        })}
        catch (err) {
            setLoading(false);
            console.error(err);
            setError({state: true, text: err.message});
        } 

    }, [props.url, props.id]);

    const DetailsItem = () => {
        return (
            <div className='details__item'>
                <img src={details.avatar} alt={details.name}/>
                <div className='item item_name'>{details.name}</div>
                <div className='item item_city'>City: {details.details.city}</div>
                <div className='item item_company'>Company: {details.details.company}</div>
                <div className='item item_position'>Position: {details.details.position}</div>
            </div>
        )
    }

    return (
        <div className='details'>
            {(loading && error) ? <Loading /> : <DetailsItem />}
            {error && <Error error={error}  />}
        </div>
    )
}

Details.propTypes = {
    url: PropTypes.string,
    id: PropTypes.number,
}


