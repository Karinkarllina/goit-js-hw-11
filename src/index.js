import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix';
import { fetchImages, page, pageStart, perPage, resetPage } from './fetchImages';

const searchFormEl = document.querySelector('#search-form');
const inputSearch = document.querySelector('.input-search');
const galleryEl = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');


const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });


searchFormEl.addEventListener('submit', onSearchFormSubmit);
btnLoadMore.addEventListener('click', nextPageImagesAdd);



function onSearchFormSubmit(event) {
        event.preventDefault();

        const searchValue = event.currentTarget.elements.searchQuery.value;

        if (searchValue === '') {
                galleryEl.innerHTML = '';
                btnLoadMore.classList.add('is-hidden');
                return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {

                async function getImages() {
                        try {
                                resetPage();
                                const searchImages = await fetchImages(searchValue);
                        
                                if (searchImages.data.hits.length === 0) {
                                        galleryEl.innerHTML = '';
                                        btnLoadMore.classList.add('is-hidden');
                                
                                        return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                                
                                } else {
                                        createImagesMarkup(searchImages)
                                        btnLoadMore.classList.remove('is-hidden');
                                }
                        
                        } catch {
                                galleryEl.innerHTML = '';
                                btnLoadMore.classList.add('is-hidden');
                                return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                        }
              
                }
                getImages();
        }
 
}


async function nextPageImagesAdd() {
        
        const searchValueInput = inputSearch.value;

        try {
                const searchImagesNextPage = await fetchImages(searchValueInput);
                const totalHitsPage = searchImagesNextPage.data.totalHits;
                const totalPage = (page - 1) * perPage;
                console.log(totalHitsPage);
                console.log(page)
                console.log(perPage)
                console.log(totalPage);

                if (totalPage >= totalHitsPage) {
                        btnLoadMore.classList.add('is-hidden');
                        return Notify.failure("We're sorry, but you've reached the end of search results.");
                } else {
                createImagesMarkup(searchImagesNextPage);        
                }
                

                
        } catch {
                galleryEl.innerHTML = '';
                btnLoadMore.classList.add('is-hidden');
                return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }


}


function createImagesMarkup(searchImages) {
    const imagesMarkup = searchImages.data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return ` <a href='${largeImageURL}' class="image-large-link">
                <div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" width=200/>
                <div class="info">
                        <p class="info-item">
                        <b>Likes</b>
                        ${likes}
                        </p>
                        <p class="info-item">
                        <b>Views</b>
                        ${views}
                        </p>
                        <p class="info-item">
                        <b>Comments</b>
                        ${comments}
                        </p>
                        <p class="info-item">
                        <b>Downloads</b>
                        ${downloads}
                        </p>
                        </div>
                        </div> `;
    }).join('');
        galleryEl.innerHTML = imagesMarkup;
        return imagesMarkup;
}

 