import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");

export function displayImages(images, currentPage) {
    if (currentPage === 1) {
        gallery.innerHTML = "";
    }

    const markup = images
        .map(
            (image) => `
        <li class="img-card">
            <a href="${image.largeImageURL}">
                <img 
                    src="${image.webformatURL}" 
                    alt="${image.tags}" 
                    data-source="${image.largeImageURL}" 
                />
            </a>
            <div class="image-info">
                <p><strong>Likes:</strong> ${image.likes}</p>
                <p><strong>Views:</strong> ${image.views}</p>
                <p><strong>Comments:</strong> ${image.comments}</p>
                <p><strong>Downloads:</strong> ${image.downloads}</p>
            </div>
        </li>`
        )
        .join("");

    gallery.insertAdjacentHTML('beforeend', markup);

    const lightbox = new SimpleLightbox(".gallery a", {
        captionsData: "alt",
        captionDelay: 250,
    });

    lightbox.refresh();
}
