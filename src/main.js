import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { axiosImages } from "./js/pixabay-api";
import { displayImages } from "./js/render-functions";

const form = document.querySelector("form");
const loadingMessage = document.querySelector(".loader-first");
const loadingBottom = document.querySelector(".loader-bottom");
const btnLoadMore = document.querySelector(".btn-loadmore");
const gallery = document.querySelector('.gallery');

let currentPage = 1;
let previousSearch = "";
let userQuery = "";
let totalHits = 0;

function clearGallery() {
    gallery.innerHTML = "";
}

form.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const input = evt.target.querySelector("input");
    const inputValue = input.value.trim();

    if (inputValue === "") {
        iziToast.error({
            message: "Please fill in the field!",
            position: "topRight",
            messageColor: "#FAFAFB",
            backgroundColor: "#EF4040"
        });
        return;
    }

    userQuery = inputValue;

    if (inputValue !== previousSearch) {
        currentPage = 1;
        previousSearch = inputValue;
        gallery.innerHTML = "";
        btnLoadMore.style.display = "block";
    }

    if (loadingMessage) {
        loadingMessage.style.display = "block";
    };

    try {
        const { images, totalHits } = await axiosImages(userQuery, currentPage);

        if (!images || images.length === 0) {
            iziToast.warning({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight",
                messageColor: "#FAFAFB",
                backgroundColor: "#EF4040"
            });
            return;
        }

        clearGallery();
        displayImages(images, currentPage);

        if (currentPage * 15 >= totalHits) {
            iziToast.error({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
                messageColor: "#FAFAFB",
                backgroundColor: "#EF4040"
            });
            btnLoadMore.style.display = "none";
        } else {
            btnLoadMore.style.display = "block";
        }

        currentPage++;

    } catch (error) {
        iziToast.error({
            message: "Error",
            position: "topRight",
            messageColor: "#FAFAFB",
            backgroundColor: "#EF4040"
        });
    } finally {
        if (loadingMessage) {
            loadingMessage.style.display = "none";
        }
    };

    form.reset();
});


btnLoadMore.addEventListener("click", async () => {
    if (loadingBottom) {
        loadingBottom.style.display = "block";
        console.log("Loading bottom message shown");
    }

    try {
        const { images, totalHits } = await axiosImages(userQuery, currentPage);

        if (images && images.length > 0) {
            displayImages(images, currentPage);
            currentPage++;

            if (currentPage * 15 >= totalHits) {
                iziToast.error({
                    message: "We're sorry, but you've reached the end of search results.",
                    position: "topRight",
                    messageColor: "#FAFAFB",
                    backgroundColor: "#EF4040"
                });
                btnLoadMore.style.display = "none";
            } else {
                btnLoadMore.style.display = "block";
            }

            scrollToNextImages();
        }
    } catch (error) {
        iziToast.error({
            message: "Error loading more images",
            position: "topRight",
            messageColor: "#FAFAFB",
            backgroundColor: "#EF4040"
        });
    } finally {
        if (loadingBottom) {
            loadingBottom.style.display = "none";
        }
    }
});


function scrollToNextImages() {
    const firstImageCard = document.querySelector(".img-card");
    if (firstImageCard) {
        const cardHeight = firstImageCard.getBoundingClientRect().height;
        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth"
        });
    }
}
