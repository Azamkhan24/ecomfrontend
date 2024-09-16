import React from 'react'
import VerticalCardProduct from '../components/VerticalCardProduct'
import productImg from '../assest/products.png'

export default function ProductPage() {
    return (
        <>
            <div>
                <div className='h-60 w-full'
                    style={{
                        backgroundImage: `url(${productImg})`,
                        backgroundPosition: "bottom",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"
                    }}>
                </div>
                <div className='px-20 pt-10'>
                    <div className='text-5xl font-semibold text-violet-950'>
                        Our Products
                    </div>
                    <div className='text-sm p-2'>With the help of our experts, we offer a high range of Industrial Rubber Hoses and Sheets to our clients. Our range includes Rubber Sheets, Industrial Rubber Hoses, PVC Products, Industrial Fluid Hoses, Welding Hose, Industrial Metallic Hoses and Industrial Vacuum Hoses. Furthermore, with the support of our team members, we meet the bulk demand of our clients within the committed time frame.</div>
                </div>
                <VerticalCardProduct />
            </div>
        </>
    )
}
