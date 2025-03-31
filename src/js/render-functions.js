import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");

// Ініціалізація SimpleLightbox один раз
const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
});

// Функція очищення галереї
export function clearGallery() {
    gallery.innerHTML = "";
}

export function displayImages(images) {
    // Оновлення markup без очищення галереї
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

    // Додаємо нові зображення під старими
    gallery.insertAdjacentHTML('beforeend', markup);

    // Оновлення lightbox після додавання нових зображень
    lightbox.refresh();
}
