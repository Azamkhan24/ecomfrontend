import React, { useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { FaCloudUploadAlt } from 'react-icons/fa';
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from 'react-icons/md';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Loader from '../common/Loader';
import { deleteImage } from '../helpers/deleteImage';

const UploadProduct = ({ onClose, fetchData }) => {
  const [loading, setLoading] = useState(false);
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false); 
  const [fullScreenImage, setFullScreenImage] = useState(''); 
  const [formData, setFormData] = useState({
    hsn: '',
    hsnCode: '',
    hsnNo: '',
    qty: '',
    taxRate: '',
    itemRate: '',
    imageUpload: [],
    embedLink: '',
    aboutProduct: {
      title: '',
      company: '',
      sellingPrice: '',
      itemPrice: '',
      description: '',
    },
  });

  useEffect(() => {
    // Fetch HSN data from the API
    fetch(SummaryApi.getSHN.url, { method: SummaryApi.getSHN.method })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.hsns && data.hsns.length > 0) {
          const hsnData = data.hsns[0]; // Get the first item from the "hsns" array
          setFormData((prev) => ({
            ...prev,
            hsn: hsnData._id || '',
            hsnCode: hsnData.hsnCode || '',
            hsnNo: hsnData.hsnNo || '',
            qty: hsnData.qty || '',
            taxRate: hsnData.taxRate || '',
            itemRate: hsnData.itemRate || '',
            embedLink: hsnData.embedLink || '', 
            aboutProduct: hsnData.aboutProduct || {
              title: '',
              company: '',
              sellingPrice: '',
              itemPrice: '',
              description: '',
            },
            userName: hsnData.userId?.name || '', 
            userEmail: hsnData.userId?.email || '',
          }));
        } else {
          console.warn('No HSN data found');
        }
      })
      .catch((error) => console.error('Error fetching HSN data:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageUpload') {
      setFormData((prev) => ({
        ...prev,
        imageUpload: [...files], // Store multiple files
      }));
    } else if (name in formData.aboutProduct) {
      setFormData((prev) => ({
        ...prev,
        aboutProduct: {
          ...prev.aboutProduct,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUploadProduct = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);
    try {
      const uploadedImages = await Promise.all(files.map((file) => uploadImage(file)));
      setFormData((prev) => ({
        ...prev,
        imageUpload: [...prev.imageUpload, ...uploadedImages.map((img) => img.url)],
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Image upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProductImage = async (index) => {
    const newImageUpload = [...formData.imageUpload];
    const imageUrl = newImageUpload[index];
    const publicId = imageUrl.split('/').slice(-1)[0].split('.')[0];

    if (publicId) {
      try {
        const response = await deleteImage(publicId); 
        if (response.result === 'ok') {
          newImageUpload.splice(index, 1);
          setFormData((prev) => ({
            ...prev,
            imageUpload: newImageUpload,
          }));
        } else {
          toast.error('Failed to delete image');
        }
      } catch (error) {
        toast.error('Error deleting image');
      }
    } else {
      newImageUpload.splice(index, 1);
      setFormData((prev) => ({
        ...prev,
        imageUpload: newImageUpload,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      hsn: formData.hsn, // Corrected field name
      hsnCode: formData.hsnCode,
      hsnNo: formData.hsnNo,
      qty: formData.qty,
      taxRate: formData.taxRate,
      itemRate: formData.itemRate,
      imageUpload: formData.imageUpload,
      embedLink: formData.embedLink,
      aboutProduct: formData.aboutProduct,
    };

    console.log("send to data", dataToSend);

    try {
      const response = await fetch(SummaryApi.uploadProduct.url, {
        method: SummaryApi.uploadProduct.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      onClose();
      fetchData();

      setFormData({
        hsn: '',
        hsnCode: '',
        hsnNo: '',
        qty: '',
        taxRate: '',
        itemRate: '',
        imageUpload: [],
        embedLink: '',
        aboutProduct: {
          title: '',
          company: '',
          sellingPrice: '',
          itemPrice: '',
          description: '',
        },
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Form submission failed');
    }
  };

  return (
    <>
      {loading && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80'>
          <Loader />
        </div>
      )}
      <div className='fixed w-full h-full bg-gray-800 bg-opacity-50 top-0 z-40 left-0 right-0 bottom-0 flex justify-center items-center '>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full  overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-700'>
          <div className='flex justify-between items-center pb-3'>
            <h2 className='font-bold text-lg'>Upload Product</h2>
            <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
              <CgClose />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 py-10 flex flex-col items-start gap-4 h-full">
          <div className="flex flex-wrap gap-4 text-black">
            <div>
              <label htmlFor="hsnCode" className="block text-sm font-medium text-gray-700">
                HSN Code
              </label>
              <input
                type="text"
                name="hsnCode"
                value={formData.hsnCode}
                onChange={handleChange}
                className="px-2 mt-1 block w-full border rounded-md"
                disabled
              />
            </div>

            <div>
              <label htmlFor="hsnNo" className="block text-sm font-medium text-gray-700">
                HSN No
              </label>
              <input
                type="text"
                name="hsnNo"
                value={formData.hsnNo}
                onChange={handleChange}
                className="px-2 mt-1 block w-full border rounded-md"
                disabled
              />
            </div>

            <div>
              <label htmlFor="qty" className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                name="qty"
                value={formData.qty}
                onChange={handleChange}
                className="px-2 mt-1 block w-full border rounded-md"
                disabled
              />
            </div>

            <div>
              <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700">
                Tax Rate
              </label>
              <input
                type="number"
                name="taxRate"
                value={formData.taxRate}
                onChange={handleChange}
                className="px-2 mt-1 block w-full border rounded-md"
                disabled
              />
            </div>

            <div>
              <label htmlFor="itemRate" className="block text-sm font-medium text-gray-700">
                Item Rate
              </label>
              <input
                type="number"
                name="itemRate"
                value={formData.itemRate}
                onChange={handleChange}
                className="px-2 mt-1 block w-full border rounded-md"
                disabled
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 py-2">
                Image Upload
              </label>
              <div className='flex items-center gap-2'>
                <label htmlFor='uploadImageInput'>
                  <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                    <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                      <span className='text-4xl'>
                        <FaCloudUploadAlt />
                      </span>
                      <p className='text-sm'>Upload Product Image</p>
                      <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                    </div>
                  </div>
                </label>
                <div>
                  {formData.imageUpload.length > 0 ? (
                    <div className='flex items-start gap-2 w-10 '>
                      {formData.imageUpload.map((image, index) => (
                        <div className='relative group' key={index}>
                          <img
                            src={image}
                            alt={`product-image-${index}`}
                            width={80}
                            height={80}
                            className='bg-slate-100 border cursor-pointer w-10 aspect-auto'
                          />
                          <div
                            className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer'
                            onClick={() => handleDeleteProductImage(index)}
                          >
                            <MdDelete />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className='text-red-600 text-xs'>*Please upload product image</p>
                  )}
                </div>
              </div>
              <p className='text-xs py-2'><span className='text-red-500 font-semibold'>Note:</span> you can upload upto 10 images only </p>
            </div>
          </div>

          <div>
            <label htmlFor="embedLink" className="block text-sm font-medium text-gray-700 py-2">
              Embed Link
            </label>
            <input
              type="text"
              name="embedLink"
              value={formData.embedLink}
              onChange={handleChange}
              className="px-2 mt-1 block w-full border rounded-md"
            />
          </div>

          <h2 className='font-semibold text-lg'>About Product</h2>
          <div className='flex flex-wrap items-center gap-2'>

            <div className='flex flex-col space-y-2 py-2'>
              <label className='font-semibold'>Title</label>
              <input
                name='title'
                value={formData.aboutProduct.title}
                onChange={handleChange}
                placeholder='Product Title'
                className='border px-2 py-1 w-full rounded'
              />
            </div>

            <div className='flex flex-col space-y-2 py-2'>
              <label className='font-semibold'>Company</label>
              <input
                name='company'
                value={formData.aboutProduct.company}
                onChange={handleChange}
                placeholder='Company'
                className='border px-2 py-1 w-full rounded'
              />
            </div>

            <div className='flex flex-col space-y-2 py-2'>
              <label className='font-semibold'>Selling Price</label>
              <input
                type='number'
                name='sellingPrice'
                value={formData.aboutProduct.sellingPrice}
                onChange={handleChange}
                placeholder='Selling Price'
                className='border px-2 py-1 w-full rounded'
              />
            </div>

            <div className='flex flex-col space-y-2 py-2'>
              <label className='font-semibold'>Item Price</label>
              <input
                type='number'
                name='itemPrice'
                value={formData.aboutProduct.itemPrice}
                onChange={handleChange}
                placeholder='Item Price'
                className='border px-2 py-1 w-full rounded'
              />
            </div>

            <div className='flex flex-col space-y-2 py-2'>
              <label className='font-semibold'>Description</label>
              <textarea
                name='description'
                value={formData.aboutProduct.description}
                onChange={handleChange}
                placeholder='Product Description'
                className='border px-2 py-1 w-full rounded'
              />
            </div>
          </div>

          <button
            className='bg-blue-500 text-white px-4 py-2 rounded'
            type="submit"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        </div>

        {openFullScreenImage && (
          <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
        )}
      </div>
    </>
  );
};

export default UploadProduct;
