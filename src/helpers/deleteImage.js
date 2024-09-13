import CryptoJS from 'crypto-js';

const deleteUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/destroy`;

const deleteImage = async (publicId) => {
    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
    formData.append("timestamp", Math.floor(Date.now() / 1000)); // Current timestamp for security reasons

    const signature = generateSignature(publicId, formData.get("timestamp"));
    formData.append("signature", signature);

    const response = await fetch(deleteUrl, {
        method: "POST",
        body: formData
    });

    return response.json();
};

// Helper function to generate the signature
const generateSignature = (publicId, timestamp) => {
    const apiSecret = process.env.REACT_APP_CLOUDINARY_API_SECRET;
    const hashString = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = CryptoJS.SHA1(hashString).toString();
    return signature;
};

export { deleteImage };
