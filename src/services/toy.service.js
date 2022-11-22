import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

export const LABELS = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor']
export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy
}

function query(filterBy) {
  return httpService.get('toy', { params: { ...filterBy }})
}

function getById(id) {
  return httpService.get('toy/' + id)
    .then(toy => {
      toy.reviews = [
        { _id: utilService.makeId(), text: 'Awesome toy!' },
        { _id: utilService.makeId(), text: 'Awesome toy!' }
      ]

      return toy
    })
}

function remove(id) {
  return httpService.delete('toy/' + id)
}

function save(toy) {
  return httpService.post('toy', toy)
}

function getEmptyToy() {
  return {
    _id: '',
    name: '',
    price: 0,
    labels: [],
    createdAt: 0,
    inStock: false
  }
}