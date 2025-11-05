import axios from 'axios';

class CategoryService {
    static url = 'https://www.olx.com.lb/api'

    static async getCategories() {
        try {
            const response = await axios.get(`${this.url}/categories`);
            return response;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
}

export default CategoryService;
