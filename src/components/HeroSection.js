import React from 'react';
import heroImg from '../assest/hero.jpg'; // Ensure correct path for your image

const HeroSection = () => {
    const scrollToSection = () => {
        const section = document.getElementById('vertical-card-product');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${heroImg})` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative flex flex-col justify-center items-center h-full text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Welcome to Our Store
                </h1>
                <p className="text-sm md:text-sm font-thin mb-8">
                    Discover the best products tailored just for you.
                </p>
                <button
                    onClick={scrollToSection}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded"
                >
                    Shop Now
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
