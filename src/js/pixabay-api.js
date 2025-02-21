import axios from "axios";

const myApiKey = "48961514-d720aad073d42be14fd4daf93";
const URL = "https://pixabay.com/api/";

export async function axiosImages(query, currentPage = 1) {
    try {
        const response = await axios.get(URL, {
            params: {
                key: myApiKey,
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: "true",
                page: currentPage,
                per_page: 40
            },
        });

        return {
            images: response.data.hits,
            totalHits: response.data.totalHits
        };
    } catch (error) {
        console.error("Error fetching images:", error);
        iziToast.error({
            message: "An error occurred while fetching images. Please try again!",
            position: "topRight",
            messageColor: "#FAFAFB",
            backgroundColor: "#EF4040"
        });
        return { images: [], totalHits: 0 };
    }
}
