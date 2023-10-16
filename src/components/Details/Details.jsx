import React, { useState, useEffect } from 'react';
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
        console.log(details);
        console.log('url',`${props.url}${props.id}.json`);
        return fetch(`${props.url}${props.id}.json`)
        .then((request) => {
            setLoading(true);
            return request;
          })
        .then((response) => { 
            if (!response.ok) {
                throw new Error('Something went wrong...');
            }
            return response.json()})
        .then((result) => {
            console.log('3', result);
            setDetails(result);
            // setLoading(false);
            setError(null)
        })
        .catch((err) => {
            console.log(4);
            // setLoading(false);
            console.error(err);
            setError({state: true, text: err.message});
        })
        .finally(() => {
            setTimeout(() => setLoading(false), 1000)
        })
    }, [props.url, props.id])

    // function isEmpty(obj) {
    //     for (var prop in obj) {
    //       if (Object.prototype.hasOwnProperty.call(obj, prop)) {
    //         return false;
    //       }
    //     }
      
    //     return true
    // }

    const DetailsItem = () => {
        console.log('details', details)
        return (
            <div className='details__item'>
                <img src={details.avatar} alt={details.name}/>
                <div className='item_name'>{details.name}</div>
                <div className='item_city'>{details.details.city}</div>
                <div className='item_company'>{details.details.company}</div>
                <div className='item_position'>{details.details.position}</div>
            </div>
        )
    }
    debugger;
    console.log('details2', details)
    return (
        <div className='details'>
            {(loading && error) ? <Loading /> : <DetailsItem />}
            {error && <Error error={error}  />}
            {/* {details && <DetailsItem /> } */}
            {/* {(!isEmpty(details)) ? <DetailsItem /> : <></>}  */}
        </div>
    )
}

Details.propTypes = {
    url: PropTypes.string,
    id: PropTypes.number,
}


