import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { Notify } from 'notiflix';
import { fetchImages, page, pageStart, perPage, resetPage, loadPage } from './fetchImages';

const searchFormEl = document.querySelector('#search-form');
const inputSearch = document.querySelector('.input-search');
const galleryEl = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');


let lightbox;

searchFormEl.addEventListener('submit', onSearchFormSubmit);
btnLoadMore.addEventListener('click', nextPageImagesAdd);
window.addEventListener('scroll', scrollPage);


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
                                console.log(searchImages);
                                const totalHitsNotify = searchImages.data.totalHits;
                        
                                if (searchImages.data.hits.length === 0) {
                                        galleryEl.innerHTML = '';
                                        btnLoadMore.classList.add('is-hidden');
                                        return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                                
                                } else {
                                        loadPage();
                                        
                                        galleryEl.innerHTML = createImagesMarkup(searchImages);
                                        lightbox = new SimpleLightbox('.gallery a', {captionDelay: 250}).refresh();
                                        btnLoadMore.classList.remove('is-hidden');
                                        Notify.success(`Hooray! We found ${totalHitsNotify} images.`)
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
                const totalPage = page * perPage;

                if (totalPage >= totalHitsPage) {
                        btnLoadMore.classList.add('is-hidden');
                        return Notify.failure("We're sorry, but you've reached the end of search results.");
                } else {
                        loadPage();
                        galleryEl.insertAdjacentHTML('beforeend', createImagesMarkup(searchImagesNextPage));
                        lightbox = new SimpleLightbox('.gallery a', {captionDelay: 250}).refresh();        
                }
                

                
        } catch {
                galleryEl.innerHTML = '';
                btnLoadMore.classList.add('is-hidden');
                return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }

}

function createImagesMarkup(searchImages) {
    const imagesMarkup = searchImages.data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return ` <div class="photo-card">
                <a href='${largeImageURL}' class="image-large-link">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" width="350" height="233"/>
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
                </a>
                </div>`;
    }).join('');
        return imagesMarkup;
}


function scrollPage(event) {
const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}