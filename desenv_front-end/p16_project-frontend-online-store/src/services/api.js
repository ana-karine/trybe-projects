export async function getCategories() {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/categories';
  try {
    const requestAPI = await fetch(endpoint);
    const requestJson = await requestAPI.json();
    return requestJson;
  } catch (error) {
    return error;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  try {
    const requestAPI = await fetch(endpoint);
    const requestJson = await requestAPI.json();
    return requestJson;
  } catch (error) {
    return error;
  }
}

export async function getReviews(productId) {
  const endpoint = `https://api.mercadolibre.com/reviews/item/${productId}`;
  try {
    const requestAPI = await fetch(endpoint);
    const requestJson = await requestAPI.json();
    return requestJson;
  } catch (error) {
    return error;
  }
}
