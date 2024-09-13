import React from 'react';



const AboutPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-8 px-4">
            <div className="container mx-auto">
                <section className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">About Us</h1>
                    <p className="text-lg text-gray-700 mb-6">
                        We are a leading e-commerce company committed to delivering exceptional products and services to our customers. Founded in 2010, we have been at the forefront of the industry, providing innovative solutions and high-quality products.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-red-600 animate-pulse">What We Do</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-r from-red-100 to-red-200 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <h3 className="text-xl md:text-2xl font-semibold mb-3 text-red-700">Our Mission</h3>
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

                        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <h3 className="text-xl md:text-2xl font-semibold mb-3 text-blue-700">Our Values</h3>
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



                <section>
                    <h2 className="text-3xl font-semibold mb-4">Our Location</h2>
                    <div>
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
    );
};

export default AboutPage;
