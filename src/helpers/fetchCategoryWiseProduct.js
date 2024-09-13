const { default: SummaryApi } = require("../common");

const fetchCategoryWiseProduct = async () => {
    try {
        const response = await fetch(SummaryApi.allProduct.url);
        const dataResponse = await response.json();
        return dataResponse;  // Return the response instead of setting state
    } catch (err) {
        throw new Error('Failed to load products');  // Throw error for handling in the caller
    }
};

export default fetchCategoryWiseProduct;
