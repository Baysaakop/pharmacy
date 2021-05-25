const api = {
    items: 'http://127.0.0.1:8000/api/items/items',
    posts: 'http://127.0.0.1:8000/api/items/posts',
    users: 'http://127.0.0.1:8000/api/users',
    signin: 'http://127.0.0.1:8000/rest-auth/login/',
    signup: 'http://127.0.0.1:8000/rest-auth/registration/',
    passwordreset: 'http://127.0.0.1:8000/rest-auth/password/reset/',
    passwordresetconfirm: 'http://127.0.0.1:8000/rest-auth/password/reset/confirm/',
    authFacebook: 'http://127.0.0.1:8000/rest-auth/facebook/',
    authGoogle: 'http://127.0.0.1:8000/rest-auth/google/',
    profile: 'http://127.0.0.1:8000/rest-auth/user/',
    mediaItems: 'http://127.0.0.1:8000/media/items',
    mediaUsers: 'http://127.0.0.1:8000/media/users',
    mediaUploads: 'http://127.0.0.1:8000/media/uploads',
    ckeditor: 'http://127.0.0.1:8000/ckeditor/',
}

export default api;