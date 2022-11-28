import { httpService } from './http.service.js'

export const TAGS = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor']
export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy
}

function query(filterBy) {
  return httpService.get('toy', filterBy)
}

function getById(id) {
  return httpService.get('toy/' + id)
}

function remove(id) {
  return httpService.delete('toy/' + id)
}

function save(toy) {
  return toy._id
    ? httpService.put('toy/' + toy._id, toy)
    : httpService.post('toy', toy)
}

function getEmptyToy() {
  return {
    _id: '',
    name: '',
    imgUrl: '',
    price: 0,
    tags: [],
    createdAt: 0,
    reviews: [],
    inStock: false
  }
}