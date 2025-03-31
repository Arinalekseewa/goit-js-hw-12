import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { axiosImages } from "./js/pixabay-api";
import { displayImages, clearGallery } from "./js/render-functions";

const form = document.querySelector("form");
const loadingMessage = document.querySelector(".loader-first");
const loadingBottom = document.querySelector(".loader-bottom");
const btnLoadMore = document.querySelector(".btn-loadmore");
const gallery = document.querySelector(".gallery");

let currentPage = 1;
let previousSearch = "";
let userQuery = "";
let totalHits = 0;

form.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const input = evt.target.querySelector("input");
    const inputValue = input.value.trim();

    if (!inputValue) {
        iziToast.error({
            message: "Please fill in the field!",
            position: "topRight",
            messageColor: "#FAFAFB",
            backgroundColor: "#EF4040"
        });
        return;
    }

    if (inputValue !== previousSearch) {
        currentPage = 1;
        previousSearch = inputValue;
        userQuery = inputValue;

        // Очищаємо галерею при новому пошуку
        clearGallery();

        // Приховуємо кнопку "Load More" при новому пошуку
        btnLoadMore.style.display = "none";
    }

    if (loadingMessage) loadingMessage.style.display = "block"; // Показуємо лоадер

    try {
        const { images, totalHits: newTotalHits } = await axiosImages(userQuery, currentPage);
        totalHits = newTotalHits; // Оновлення глобальної змінної

        if (!images?.length) {
            iziToast.warning({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight",
                messageColor: "#FAFAFB",
                backgroundColor: "#EF4040"
            });
            btnLoadMore.style.display = "none"; // Ховаємо кнопку, якщо немає результатів
            return;
        }

        displayImages(images, currentPage);
        currentPage++;

        // Перевіряємо, чи залишилися ще зображення
        btnLoadMore.style.display = currentPage * 15 < totalHits ? "block" : "none";

    } catch (error) {
        console.error(error);
        iziToast.error({
            message: "Failed to fetch images. Please check your internet connection.",
            position: "topRight",
            messageColor: "#FAFAFB",
            backgroundColor: "#EF4040"
        });
    } finally {
        if (loadingMessage) loadingMessage.style.display = "none"; // Ховаємо лоадер
    }

    form.reset();
});

btnLoadMore.addEventListener("click", async () => {
    btnLoadMore.style.display = "none"; // Ховаємо кнопку перед запитом
    if (loadingBottom) loadingBottom.style.display = "block"; // Показуємо лоадер

    try {
        const { images } = await axiosImages(userQuery, currentPage);

        if (!images?.length) {
            btnLoadMore.style.display = "none"; // Якщо зображень немає, приховуємо кнопку
            return;
        }

        displayImages(images, currentPage);
        currentPage++;

        // Відображаємо кнопку, якщо ще є зображення
        btnLoadMore.style.display = currentPage * 15 < totalHits ? "block" : "none";
        scrollToNextImages();
    } catch (error) {
        console.error(error);
        iziToast.error({
            message: "Error loading more images",
            position: "topRight",
            messageColor: "#FAFAFB",
            backgroundColor: "#EF4040"
        });
    } finally {
        if (loadingBottom) loadingBottom.style.display = "none"; // Ховаємо лоадер після завантаження
    }
});

function scrollToNextImages() {
    const firstImageCard = document.querySelector(".img-card");
    if (firstImageCard) {
        const cardHeight = firstImageCard.getBoundingClientRect().height;
        window.scrollBy({ top: cardHeight * 2, behavior: "smooth" });
    }
}
