import React from 'react';
import aboutHead from '../assest/about.jpg'
import about1 from '../assest/about4.jpg'
import about2 from '../assest/vision.jpg'

const AboutPage = () => {
    return (
        <>    
             <section className="relative text-center  bg-cover bg-center h-72 flex items-center justify-center" style={{ backgroundImage: `url(${aboutHead})` }}>
                    <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0 z-0"></div>
                    <div className="relative z-10 text-white">
                        <h1 className="text-6xl font-bold mb-4">About Us</h1>
                        <p className="text-lg font-thin mb-6">
                            We are a leading e-commerce company committed to delivering exceptional products and services to our customers.
                        </p>
                    </div>
                </section>
        
            <div className="bg-gray-100 min-h-screen ">
            
            <div className="container mx-auto">
                {/* Header Section with Background Image */}

                {/* What We Do Section */}
                <section className="mb-12 flex  flex-col gap-10 bg-slate-200 p-10">
                    <h2 className="text-2xl md:text-6xl font-semibold mb-6 text-center text-gray-900">What We Do</h2>


                    <div className="bg-neutral-100  p-6 rounded border ">
                            <img
                                src={about1}
                                alt="Mission Image"
                                className="w-full h-96 object-cover rounded-lg mb-4"
                            />
                            <div className='px-10 py-5'>
                            <h3 className="text-xl md:text-3xl font-semibold mb-3 text-gray-900">Our Mission</h3>
                            <p className="text-gray-800 mb-3">
                                Our mission is to enhance the shopping experience by offering diverse, high-quality products, backed by excellent customer service and support.
                            </p>
                            <p className="text-gray-800 mb-3">
                                We prioritize sustainability and ethical practices, sourcing responsibly and minimizing environmental impact through eco-friendly packaging and operations.
                            </p>
                            <p className="text-gray-800">
                                We aim to build lasting relationships with our customers by delivering an exceptional and convenient shopping experience that evolves with their needs.
                            </p>
                            </div>
                        </div>

                        <div className="bg-neutral-100  p-6 rounded border ">
                            <img
                                src={about2}
                                alt="Values Image"
                                className="w-full h-96 object-cover  rounded-lg mb-4"
                            />
                             <div className='px-10 py-5'>
                            <h3 className="text-xl md:text-3xl font-semibold mb-3 text-gray-900">Our Values</h3>
                            <p className="text-gray-800 mb-3">
                                Integrity, innovation, and customer satisfaction are at the heart of our values. We believe in transparent business practices and strive to exceed customer expectations.
                            </p>
                            <p className="text-gray-800 mb-3">
                                We constantly innovate to stay ahead of trends and use the latest technology to offer better services. Collaboration and teamwork help us achieve our goals.
                            </p>
                            <p className="text-gray-800">
                                We are committed to making a positive impact through our products, services, and community initiatives, ensuring that we contribute meaningfully to society.
                            </p>
                            </div>
                        </div>
                </section>

                {/* Location Section with Map */}
                <section>
                    <h2 className="text-3xl font-semibold mb-4">Our Location</h2>
                    <div className="relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.6300173023533!2d77.314824374327!3d28.580870775693022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa50dd6e5afa89117%3A0x5ad6fbf331868304!2sOffice%20Sahayogi!5e0!3m2!1sen!2sin!4v1726047553870!5m2!1sen!2sin"
                            width="100%"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Office Location Map"
                        ></iframe>
                    </div>
                </section>
            </div>
        </div>
        </>

    );
};

export default AboutPage;
