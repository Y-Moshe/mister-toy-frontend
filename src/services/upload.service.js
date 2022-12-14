export const uploadService = {
  uploadImg
}

function uploadImg(ev) {
  const CLOUD_NAME    = "dgczimxpo"
  const UPLOAD_PRESET = "mister-toy"
  const UPLOAD_URL    = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const formData = new FormData();
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('file', ev.target.files[0])

  return fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(({ url }) => url)
}
