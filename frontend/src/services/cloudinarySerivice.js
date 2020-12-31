export const cloudinaryService = {
    uploadImg
}

async function uploadImg(ev) {
    const CLOUD_NAME = "dzvebcsrp"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', 'mister_toy');
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log(data.secure_url);
        console.log("data.secure_url");
        return data

    } catch (err) {
        console.log(err);
    }
}
