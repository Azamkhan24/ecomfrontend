import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import { Link } from 'react-router-dom';
import displayINRCurrency from '../helpers/displayCurrency';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    const handleLoading = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    };
    handleLoading();
  }, []);

  const updateQty = async (id, qty) => {
    try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
          fetchData();
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const increaseQty = (id, qty) => {
    updateQty(id, qty + 1);
  };

  const decreaseQty = (id, qty) => {
    if (qty > 1) {
      updateQty(id, qty - 1);
    }
  };

  const deleteCartProduct = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: id,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
        context.fetchUserAddToCart();
        // toast.success(responseData.message)

      }
    } catch (error) {
      console.error('Error deleting cart product:', error);
    }
  };

  const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
  const totalPrice = data.reduce((prev, curr) => prev + curr.quantity * curr?.productId?.aboutProduct?.sellingPrice, 0);

  if (!loading && data.length === 0) {
    return (
      <div className="h-[89vh] w-full flex items-center justify-center">
        <div className="w-[80vw] h-96 flex items-center justify-center rounded-xl bg-gray-200 border">
          <div className="text-3xl text-black">No Data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-7">
      <div className="flex flex-col lg:flex-row gap-5 lg:justify-center items-start">
        <div className="w-full max-w-3xl flex flex-col gap-4">
          {loading
            ? loadingCart.map((_, index) => (
                <div
                  key={index}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                ></div>
              ))
            : data.map((product) => (
                <div key={product._id} className="w-full bg-white h-full border border-slate-200 rounded grid grid-cols-[128px,1fr]">
                  <div className="flex items-center justify-center w-[70%] h-20 bg-slate-200">
                    <img
                      src={product?.productId?.imageUpload[0]}
                      className="sm:h-10 sm:w-10 w-20 h-20 object-scale-down mix-blend-multiply"
                      alt={product?.productId?.aboutProduct?.title}
                    />
                  </div>
                  <div className="p-2 flex-col items-center justify-between gap-10">
                    <div
                      className="text-red-800 rounded-full float-right hover:bg-red-600 hover:text-white cursor-pointer"
                      onClick={() => deleteCartProduct(product._id)}
                    >
                      <RxCross2 />
                    </div>
                    <div className="flex items-center justify-between w-full sm:w-[60%]">
                      <div>
                        <h2 className="text-sm sm:text-md lg:text-md xl:text-lg text-ellipsis line-clamp-1">
                          {product?.productId?.aboutProduct?.title}
                        </h2>
                        <p className="capitalize text-xs sm:text-sm lg:text-md xl:text-md text-slate-500">
                          {product?.productId?.aboutProduct?.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-3 py-2">
                        <button
                          className={`border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ${
                            product?.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          onClick={() => decreaseQty(product._id, product.quantity)}
                          disabled={product?.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className={`border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ${
                            product?.quantity >= product?.productId?.qty ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          onClick={() => increaseQty(product._id, product.quantity)}
                          disabled={product?.quantity >= product?.productId?.qty}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <p className="text-red-600 text-xl">
                        {displayINRCurrency(product?.productId?.aboutProduct?.sellingPrice)}
                      </p>
                      <p className="text-slate-600 text-xl">
                        {displayINRCurrency(product?.productId?.aboutProduct?.sellingPrice * product?.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-center w-full lg:w-[20%]">
          <div className="w-full">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="h-full flex flex-col gap-3">
                <h2 className="p-3 text-2xl font-semibold">Summary</h2>
                <div className="">
                  <div className="flex items-center border-b justify-between p-2 gap-2 text-sm text-slate-600">
                    <p>Quantity</p>
                    <p>{totalQty}</p>
                  </div>
                  <div className="flex items-center border-b justify-between p-3 gap-2 text-md text-slate-600">
                    <p>Sub-total</p>
                    <p>{displayINRCurrency(totalPrice)}</p>
                  </div>
                  <div className="flex items-center justify-between p-3 gap-2 text-md text-slate-600">
                    <p>Total Price</p>
                    <p className="font-semibold text-lg text-black">{displayINRCurrency(totalPrice)}</p>
                  </div>
                </div>
                <Link to="/checkoutPage">
                  <button className="bg-gray-800 hover:bg-blue-600 p-2 text-white w-full">Buy Now</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
