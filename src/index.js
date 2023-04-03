import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix';
import { fetchImages } from './fetchImages';

const searchFormEl = document.querySelector('#search-form');
const inputSearch = document.querySelector('.input-search');
const galleryEl = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34894296-d45261c0c480dae38daba0bf7';

const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });

let pageStart = 1;


searchFormEl.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit (event) {
        event.preventDefault();

        const searchValue = event.currentTarget.elements.searchQuery.value;

        if (searchValue === '') {
                galleryEl.innerHTML = '';
                btnLoadMore.classList.add('is-hidden');
                return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
        
        fetchImages(searchValue)
        
}














// async function fetchImages(searchValue) {
//         const searchParams = new URLSearchParams({
//                 key: API_KEY,
//                 q: searchValue,
//                 image_type: 'photo',
//                 orientation: 'horizontal',
//                 safesearch: 'true',
//                 per_page: 40,
//                 page: 1,
                
//         });

//         try {
//                 return await axios.get(`${BASE_URL}?${searchParams}`)
//         } catch (error) {
//                 throw new Error(error.message);
//         };

// }
// console.log(fetchImages());






 // const imagesSearch = await axios.get(`${BASE_URL}?${searchParams}`);
        // return imagesSearch.data;