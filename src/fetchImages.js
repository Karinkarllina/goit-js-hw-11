import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34894296-d45261c0c480dae38daba0bf7';


export const pageStart = 1;
export let page = pageStart;

export const perPage = 40;

  

export function fetchImages(searchValue) {
        const searchParams = new URLSearchParams({
        key: API_KEY,
        q: searchValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,
        page
        });
        console.log(page)
        try {
                return axios.get(`${BASE_URL}?${searchParams}`);      
            
        } catch (error) {
            throw new Error(error.message);
        };
}


export function resetPage() {
    page = pageStart;
};     


export function loadPage() {
        page += 1;
}