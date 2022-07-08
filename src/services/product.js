const Model = require('./../models/product')
const cloudinary = require('./../models/cloudinary')

const find = async (req) => {
  try {
    const { filter } = req.query
    return await Model.find(filter ? JSON.parse(filter) : {})
  } catch (error) {
    throw error
  }
}

const findById = async (req) => {
  try {
    const { id } = req.params

    return await Model.findById(id)
  } catch (error) {
    throw error
  }
}

const create = async (req) => {
  try {
    let data = { ...req.body }
    // console.log('req.files', req.files)

    console.log('req.files :>> ', req.files)

    // upload to cloudinary

    if (req.files.thumbnail) {
      // upload thumbnail
      let thumbnails = []
      let thumbnail = await cloudinary.uploadSingle(req.files.thumbnail[0].path)
      thumbnails.push(thumbnail)
      data.image = thumbnails.map((thumbnail) => {
        return thumbnail.url
      })
      console.log('thumbnail', thumbnail)
    }

    if (req.files.photos) {
      // upload photos
      let photos = []
      for (let i = 0; i < req.files.photos.length; i++) {
        let photo = await cloudinary.uploadSingle(req.files.photos[i].path)
        photos.push(photo)
      }
      data.image = photos.map((photo) => {
        return photo.url
      })
      console.log('photos', photos)
    }

    // return { ok: true }

    return await Model.create(data)
  } catch (error) {
    throw error
  }
}

const update = async (req) => {
  try {
    const { id } = req.params
    const data = { ...req.body }

    console.log('req.files :>> ', req.files)

    // upload to cloudinary

    if (req.files.thumbnail) {
      // upload thumbnail
      let thumbnails = []
      let thumbnail = await cloudinary.uploadSingle(req.files.thumbnail[0].path)
      thumbnails.push(thumbnail)
      data.image = thumbnails.map((thumbnail) => {
        return thumbnail.url
      })
      console.log('thumbnail', thumbnail)
    }

    if (req.files.photos) {
      // upload photos
      let photos = []
      for (let i = 0; i < req.files.photos.length; i++) {
        let photo = await cloudinary.uploadSingle(req.files.photos[i].path)
        photos.push(photo)
      }
      data.image = photos.map((photo) => {
        return photo.url
      })
      console.log('photos', photos)
    }

    return await Model.update({ id, data })
  } catch (error) {
    throw error
  }
}

const _delete = async (req) => {
  try {
    const { id } = req.params
    return await Model.delete(id)
  } catch (error) {
    throw error
  }
}

module.exports = {
  find,
  findById,
  create,
  update,
  delete: _delete,
}
