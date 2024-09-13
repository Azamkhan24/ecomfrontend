import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import scrollTop from '../helpers/scrollTop';

const CategroyWiseProductDisplay = ({ heading }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(7).fill(null);

    const scrollElement = useRef();

    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const categoryProduct = await fetchCategoryWiseProduct();
            if (categoryProduct.success) {
                setData(categoryProduct.data || []);
                console.log("Fetched data: ", categoryProduct.data);
            } else {
                setError('Failed to load products');
            }
        } catch (err) {
            setError('Failed to load products');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    };

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    };

    return (
        <div className="container mx-auto px-4 my-6 relative">
            <h2 className="text-2xl font-semibold py-4">{heading}</h2>
            {error && <p className="text-red-600">{error}</p>}
            <div className="relative flex justify-center items-center gap-4 md:gap-6 flex-wrap" ref={scrollElement}>
                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow">
                            <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                            <div className="p-4 grid gap-3">
                                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                                <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2"></p>
                                <div className="flex gap-3">
                                    <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                                    <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                                </div>
                                <button className="text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse"></button>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product) => (
                        <Link to={`/product/${product._id}`} key={product._id} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow" onClick={scrollTop}>
                            <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                                {/* Check if imageUpload exists and has at least one image */}
                                {product.imageUpload && product.imageUpload.length > 0 ? (
                                    <img src={product.imageUpload[0]} alt={product.aboutProduct.title} className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply" />
                                ) : (
                                    <div className="h-full flex justify-center items-center text-gray-500">No Image Available</div>
                                )}
                            </div>
                            <div className="p-4 grid gap-2">
                                <h2 className="md:text-lg text-ellipsis line-clamp-1">{product.aboutProduct.title}</h2>
                                <p className="capitalize text-slate-500 text-sm">{product.aboutProduct.description}</p>
                                <div className="flex gap-3 items-center justify-between">
                                    <p className="text-red-600 text-xl font-medium">{displayINRCurrency(product.aboutProduct.sellingPrice)}</p>
                                    <p className="text-slate-500 text-sm line-through">{displayINRCurrency(product.aboutProduct.itemPrice)}</p>
                                </div>
                                {product.qty > 0 ? (
                                    <button onClick={(e) => handleAddToCart(e, product._id)} className="text-sm bg-red-600 hover:bg-red-700 text-white p-1 rounded">
                                        Add to Cart
                                    </button>
                                ) : (
                                    <span className="text-red-600 border border-red-700 rounded p-1 text-center">Out of Stock</span>
                                )}
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default CategroyWiseProductDisplay;
