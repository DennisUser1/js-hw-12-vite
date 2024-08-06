import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '45195508-74bd54d08c443e52e59ea1f0e'; 

// const url = `${BASE_URL}?key=${API_KEY}&q=${urlQueryValue}&image_type=photo&orientation=horizontal&safesearch=true`;
export async function fetchImages(urlQueryValue, page = 1) {
    const params = { 
    key: API_KEY,
    q: urlQueryValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
}; 


try {
  const response = await axios.get(BASE_URL, { params });
  return response.data;
} catch (error) {
  console.error('Error fetching images:', error);
  throw error;
};
};