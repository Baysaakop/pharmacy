const baseUrl = "http://localhost:8000/"

const api = {
    items: baseUrl + 'api/items/items',
    posts: baseUrl + 'api/items/posts',
    companies: baseUrl + 'api/items/companies',
    categories: baseUrl + 'api/items/categories',
    tags: baseUrl + 'api/items/tags',
    favorites: baseUrl + 'api/items/favorites',
    carts: baseUrl + 'api/items/carts',
    users: baseUrl + 'api/users',
    authFacebook: baseUrl + 'rest-auth/facebook/',
    authGoogle: baseUrl + 'rest-auth/google/',
    profile: baseUrl + 'rest-auth/user/',
    ckeditor: baseUrl + 'ckeditor/',
}

export default api;