import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Loader from '../common/Loader';
import { deleteImage } from '../helpers/deleteImage';

const AdminEditProduct = ({
    onClose,
    productData,
    fetchdata
}) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        _id: productData?._id,
        productName: productData?.aboutProduct?.title,
        category: productData?.category || '',
        productImage: productData?.imageUpload || [],
        description: productData?.aboutProduct?.description,
        itemRate: productData?.itemRate,
        sellingPrice: productData?.aboutProduct?.sellingPrice,
        Stock: productData?.qty || 0 // Assuming qty maps to Stock
    });
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const handleUploadProduct = async (e) => {
        const files = e.target.files;
        setLoading(true); // Show loader
        try {
            const uploadedImages = await Promise.all(
                Array.from(files).map(async (file) => {
                    const uploadImageCloudinary = await uploadImage(file);
                    return uploadImageCloudinary.url;
                })
            );
            setData((prev) => ({
                ...prev,
                productImage: [...prev.productImage, ...uploadedImages],
            }));
        } catch (error) {
            console.error('Error uploading images:', error);
        } finally {
            setLoading(false); // Hide loader
        }
    };


    const handleDeleteProductImage = async (index) => {
        const newProductImage = [...data.productImage]; 
        const imageUrl = newProductImage[index];
        const publicId = imageUrl.split('/').slice(-1)[0].split('.')[0];
    
        if (publicId) {
            try {
                const response = await deleteImage(publicId);
                if (response.result === 'ok') {
                    newProductImage.splice(index, 1);
                    setData((prev) => ({
                        ...prev,
                        productImage: newProductImage, // Use productImage here
                    }));
                } else {
                    toast.error('Failed to delete image');
                }
            } catch (error) {
                toast.error('Error deleting image');
            }
        } else {
            newProductImage.splice(index, 1);
            setData((prev) => ({
                ...prev,
                productImage: newProductImage, // Use productImage here
            }));
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(SummaryApi.updateProduct.url, {
            method: SummaryApi.updateProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (responseData.success) {
            onClose();
            fetchdata();
        }

        if (responseData.error) {
            toast.error(responseData?.message);
        }
    };

    return (
        <>
            {loading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80'>
                    <Loader />
                </div>
            )}

            <div className='fixed w-full h-full bg-gray-800 bg-opacity-60 top-0 left-0 z-40 flex justify-center items-center'>
                <div className='bg-white p-4 rounded w-full max-w-2xl h-full overflow-hidden'>
                    <div className='flex justify-between items-center pb-3'>
                        <h2 className='font-bold text-lg'>Edit Product</h2>
                        <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                            <CgClose />
                        </div>
                    </div>

                    <form className='grid p-4 gap-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-700 h-full pb-5' onSubmit={handleSubmit}>
                        <label htmlFor='productName'>Product Name :</label>
                        <input
                            type='text'
                            id='productName'
                            placeholder='Enter product name'
                            name='productName'
                            value={data.productName}
                            onChange={handleOnChange}
                            className='p-2 bg-slate-100 border rounded'
                            required
                        />

                        <label htmlFor='productImage' className='mt-3'>Product Image :</label>
                        <label htmlFor='uploadImageInput'>
                            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                                <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                    <span className='text-4xl'><FaCloudUploadAlt /></span>
                                    <p className='text-sm'>Upload Product Image</p>
                                    <input type='file' id='uploadImageInput' className='hidden' multiple onChange={handleUploadProduct} />
                                </div>
                            </div>
                        </label>
                        <div>
                            {data?.productImage.length > 0 ? (
                                <div className='flex items-center gap-2'>
                                    {data.productImage.map((el, index) => (
                                        <div className='relative group' key={index}>
                                            <img
                                                src={el}
                                                alt={el}
                                                width={80}
                                                height={80}
                                                className='bg-slate-100 border cursor-pointer'
                                                onClick={() => {
                                                    setOpenFullScreenImage(true);
                                                    setFullScreenImage(el);
                                                }}
                                            />
                                            <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                                                <MdDelete />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className='text-red-600 text-xs'>*Please upload product image</p>
                            )}
                        </div>


                        <label htmlFor='itemRate' className='mt-3'>Item Rate :</label>
                        <input
                            type='number'
                            id='itemRate'
                            placeholder='Enter item rate'
                            value={data.itemRate}
                            name='itemRate'
                            onChange={handleOnChange}
                            className='p-2 bg-slate-100 border rounded'
                            required
                        />

                        <label htmlFor='Stock' className='mt-3'>Stock :</label>
                        <input
                            type='number'
                            id='Stock'
                            placeholder='Enter stock'
                            value={data.Stock}
                            name='Stock'
                            onChange={handleOnChange}
                            className='p-2 bg-slate-100 border rounded'
                            required
                        />

                        <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
                        <input
                            type='number'
                            id='sellingPrice'
                            placeholder='Enter selling price'
                            value={data.sellingPrice}
                            name='sellingPrice'
                            onChange={handleOnChange}
                            className='p-2 bg-slate-100 border rounded'
                            required
                        />

                        <label htmlFor='description' className='mt-3'>Description :</label>
                        <textarea
                            className='h-28 bg-slate-100 border resize-none p-1'
                            placeholder='Enter product description'
                            rows={3}
                            onChange={handleOnChange}
                            name='description'
                            value={data.description}
                        >
                        </textarea> 

                        <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Update Product</button>
                    </form>
                </div>

                {/** Display Image Full Screen */}
                {
                    openFullScreenImage && (
                        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
                    )
                }
            </div>
        </>
    );
}

export default AdminEditProduct;
