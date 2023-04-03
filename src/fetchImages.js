import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34894296-d45261c0c480dae38daba0bf7';


        
export async function fetchImages(searchValue) {
        const searchParams = new URLSearchParams({
        key: API_KEY,
        q: searchValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,
        page: 1,
        });
    
    try {
            return await axios.get(`${BASE_URL}?${searchParams}`)
    } catch (error) {
            throw new Error(error.message);
    };
}