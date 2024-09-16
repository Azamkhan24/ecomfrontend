import React, { useState } from "react";
import contactImg from '../assest/contact.jpg'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data: ", formData);
  };

  return (
    <div className="flex items-center justify-center mt-20 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg flex flex-col md:flex-row max-w-4xl w-full">
        {/* Left Side: Image */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src={contactImg} // Replace with your image URL
            alt="Contact Us"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 w-full p-6">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-center mb-6">Contact Us</h2>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-xs text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                placeholder="Your Name"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-xs text-gray-700 font-medium mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                placeholder="Your Phone Number"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-xs text-gray-700 font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-indigo-500"
                placeholder="Brief Description"
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
