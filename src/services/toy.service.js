import { utilService } from './util.service.js'

export const LABELS = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor']
export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy
}

const STORAGE_KEY = 'toysDB'
const RESPONSE_DELAY = 1500

let gToys = _createToys()

function query(filterBy) {
  return new Promise(resolve => {
    const { keyword, page, itemsPerPage } = filterBy

    const regex = new RegExp(keyword, 'i')
    let filteredToys = gToys.filter(toy => regex.test(toy.name))
    const startIdx = page * itemsPerPage
    const totalPages = Math.ceil(filteredToys.length / itemsPerPage)
    if (itemsPerPage !== Infinity) filteredToys = filteredToys.slice(startIdx, startIdx + itemsPerPage)

    setTimeout(() => resolve({
      toys: filteredToys,
      totalPages
    }), 0)
  })
}

function getById(id) {
  return new Promise((resolve, reject) => {
    const toy = gToys.find(toy => toy._id === id)
    if (!toy) return reject('Toy not found!')

    toy.reviews = [
      { _id: utilService.makeId(), text: 'Awesome toy!' },
      { _id: utilService.makeId(), text: 'Awesome toy!' }
    ]
    setTimeout(() => resolve(toy), RESPONSE_DELAY)
  })
}

function remove(id) {
  return new Promise((resolve, reject) => {
    const idx = gToys.findIndex(toy => toy._id === id)
    if (idx === -1) return reject('Toy not found!')

    const removedToy = gToys.splice(idx, 1)
    utilService.saveToStorage(STORAGE_KEY, gToys)
    setTimeout(() => resolve(removedToy), RESPONSE_DELAY)
  })
}

function save(toy) {
  return new Promise(resolve => {
    const toyToSave = utilService.deepCopy(toy)
    const savedToy = (toyToSave._id) ? _update(toyToSave) : _add(toyToSave)

    utilService.saveToStorage(STORAGE_KEY, gToys)
    setTimeout(() => resolve(savedToy), RESPONSE_DELAY)
  })
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

// PRIVATE FUNCTIONS

function _add(toy) {
  toy._id = utilService.makeId()
  gToys.push(toy)
  return toy
}

function _update(toy) {
  const idx = gToys.findIndex(({ _id }) => _id === toy._id)
  gToys[idx] = toy
  return toy
}

function _createToys() {
  let toys = utilService.loadFromStorage(STORAGE_KEY) || []
  if (!toys.length) {
    const MAX_TOYS = 20

    for (let i = 0; i < MAX_TOYS; i++) {
      const name = utilService.makeLorem(3)
      const price = utilService.getRandomIntInclusive(10, 200)

      const rnd = utilService.getRandomIntInclusive(0, MAX_TOYS - 1)
      const labels = LABELS.slice(rnd, MAX_TOYS - 1)

      toys.push(_createToy(name, price, labels, Date.now(), Math.random() > 0.5))
    }
    utilService.saveToStorage(STORAGE_KEY, toys)
  }
  return toys
}

function _createToy(name, price, labels, createdAt, inStock) {
  return {
    _id: utilService.makeId(),
    name, price, labels,
    createdAt, inStock,
  }
}
