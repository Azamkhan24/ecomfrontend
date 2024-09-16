import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import ScrollToTop from '../helpers/scrollTop';

const ProductDetails = () => {
  const [data, setData] = useState({
    aboutProduct: {
      title: '',
      description: '',
      sellingPrice: 0,
      itemPrice: 0,
    },
    imageUpload: [],
    qty: 0,
    taxRate: 0,
    itemRate: 0,
    embedLink: '',
  });

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataResponse = await response.json();

    console.log("res data", dataResponse);
    setData(dataResponse.data);
    setActiveImage(dataResponse?.data?.imageUpload[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({
      x,
      y,
    });
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  return (
    <>    
    
     <ScrollToTop/>
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/***product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />

            {/**product zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el, index) => (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                    key={"loadingImage" + index}
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imgURL) => (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded p-1"
                    key={imgURL}
                  >
                    <img
                      src={imgURL}
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                      onClick={() => handleMouseEnterProduct(imgURL)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/***product details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            {/* Loading skeleton */}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl lg:text-4xl font-medium">{data?.aboutProduct?.title}</h2>
            <p className="capitalize text-slate-400">{data?.category}</p>

            <div className="text-red-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-2 my-1">
              <p className="text-red-600 text-3xl">
                {displayINRCurrency(data?.aboutProduct?.sellingPrice)}
              </p>
              <p className="text-slate-400 text-sm line-through">
                {displayINRCurrency(data?.aboutProduct?.itemPrice)}
              </p>
            </div>

            <div className="flex items-center gap-3 my-2">
              {data.qty > 0 ? (
                <>
                  <div className="flex gap-3">
                    <button
                      className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
                      onClick={(e) => handleBuyProduct(e, data?._id)}
                    >
                      Buy
                    </button>
                    <button
                      className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white"
                      onClick={(e) => handleAddToCart(e, data?._id)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </>
              ) : (
                <span className="text-red-600 font-medium border border-red-700 rounded text-center px-3 py-1 min-w-[240px]">
                  Out of Stock
                </span>
              )}
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1">Description:</p>
              <p>{data?.aboutProduct?.description}</p>
            </div>
          </div>
        )}
      </div>

        <CategroyWiseProductDisplay
          heading={"Recommended Product"}
        />
   
    </div>
    </>
  );
};

export default ProductDetails;
