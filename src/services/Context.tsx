import React from 'react';
import { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext({});
/**
 * Provider for all elements
 * @param {*} {React.ReactElement.children}
 * @returns {React.ReactElement}
 */


const DataProvider = ({ children }: any): React.ReactElement => {
    const [dataCurrent, setDataCurrent] = useState([]);
    const [dataAcitveBookmark, setDataActiveBookmark] = useState([]);
    const [dataHourlyForecast, setDataHourylyForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    return (
        <Context.Provider
            value={{
                dataCurrent,
                setDataCurrent,
                dataAcitveBookmark, 
                setDataActiveBookmark,
                dataHourlyForecast, 
                setDataHourylyForecast,
                loading,
                setLoading,
                error,
                setError,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default DataProvider;

DataProvider.propTypes = {
    children: PropTypes.any,
};