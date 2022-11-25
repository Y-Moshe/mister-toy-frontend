import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

export const TAGS = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor']
export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy
}

function query() {
  return httpService.get('toy')
}

function getById(id) {
  return httpService.get('toy/' + id)
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
    tags: [],
    createdAt: 0,
    inStock: false
  }
}