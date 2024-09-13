import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryApi from '../common';
import VerticalCard from '../components/VerticalCard';

const SearchProduct = () => {
    const query = useLocation().search;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.searchProduct.url + query);
            const dataResponse = await response.json();
            setData(Array.isArray(dataResponse.data) ? dataResponse.data : []);
        } catch (error) {
            console.error('Error fetching products:', error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [query]);

    return (
        <div className='container flex-col justify-center p-3'>
            {loading && <p className='text-lg text-center'>Loading ...</p>}

            <p className='text-lg font-semibold my-3'>Search Results: {Array.isArray(data) ? data.length : 0}</p>

            {!loading && data.length === 0 && (
                <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
            )}

            {!loading && data.length > 0 && (
                <VerticalCard loading={loading} data={data} />
            )}
        </div>
    );
};

export default SearchProduct;
