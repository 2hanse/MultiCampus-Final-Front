import api from "./axios";

const getProfileImgUrlFromUserId = (userId, setCallback) => {
    api.get(`/users/info/${userId}`)
        .then((res) => setCallback(res.data.profile_img_url))
        .catch(() => setCallback(""));
};

export default getProfileImgUrlFromUserId;