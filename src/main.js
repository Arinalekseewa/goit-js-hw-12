import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { axiosImages } from "./js/pixabay-api";
import { displayImages } from "./js/render-fuctions";

const form = document.querySelector("form");
const loadingMessage = document.getElementById("#loading-message");
const btnLoadMore = document.querySelector(".btn-loadmore");

let currentPage = 1;
let previousSearch = "";
let userQuery = "";
let totalHits = 0;

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
    }

    btnLoadMore.style.display = "none";
    if (loadingMessage) loadingMessage.style.display = "block";
    console.log("Loading message shown");


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

        displayImages(images, currentPage);

        if (currentPage * 40 >= totalHits) {
            btnLoadMore.style.display = "none";
            iziToast.error({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
                messageColor: "#FAFAFB",
                backgroundColor: "#EF4040"
            });
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
        if (loadingMessage) loadingMessage.style.display = "none";
    }

    form.reset();
});


btnLoadMore.addEventListener("click", async () => {
    if (loadingMessage) loadingMessage.style.display = "block";
    console.log("Loading message shown");

    try {
        const { images, totalHits } = await axiosImages(userQuery, currentPage);

        if (images && images.length > 0) {
            displayImages(images, currentPage);
            currentPage++;

            if (currentPage * 40 >= totalHits) {
                btnLoadMore.style.display = "none";
                iziToast.error({
                    message: "We're sorry, but you've reached the end of search results.",
                    position: "topRight",
                    messageColor: "#FAFAFB",
                    backgroundColor: "#EF4040"
                });
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
        if (loadingMessage) loadingMessage.style.display = "none";
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
