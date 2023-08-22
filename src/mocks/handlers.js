// Use the baseURL from api/axiosDefaults.js
const baseURL = 'https://dj-rest-profiles-7506ba4404dc.herokuapp.com/'

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (res, req, ctx) => {
        return res(ctx.json())
    })
]