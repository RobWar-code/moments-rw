// Use the baseURL from api/axiosDefaults.js
const baseURL = 'https://dj-rest-profiles-7506ba4404dc.herokuapp.com/'

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (res, req, ctx) => {
        return res(ctx.json({
            "pk": 1,
            "username": "Robin",
            "email": "rowaniar@netscape.net",
            "first_name": "",
            "last_name": "",
            "profile_id": 1,
            "profile_image": "https://res.cloudinary.com/dye9ynxxb/image/upload/v1/media/../default_profile_daov8n"    
        }))
    }),
    rest.get(`${baseURL}dj-rest-auth/logout`, (res, req, ctx) => {
        return res(ctx.status(200))
    })
]