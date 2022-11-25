import { toyService } from '../../services/toy.service.js'

export const toyModule = {
  state() {
    return {
      toys: [],
      totalPages: 0,
      filterBy: {
        keyword: '',
        // page: 0,
        // itemsPerPage: 6,
        inStock: true,
        tags: [],
        sortBy: 'Name'
      }
    }
  },
  mutations: {
    setToys(state, toys) {
      state.toys = toys
    },
    removeToy({ toys }, toyId) {
      const idx = toys.findIndex(({ _id }) => _id === toyId)
      toys.splice(idx, 1)
    },
    saveToy({ toys }, toy) {
      if (toy._id) {
        const idx = toys.findIndex(({ _id }) => _id === toy._id)
        toys[idx] = toy

      } else toys.push(toy)
    },
    setFilterBy(state, { target }) {
      state.filterBy[target.name] = target.value
    }
  },
  actions: {
    loadToys({ commit }) {
      return toyService.query()
        .then(results => commit('setToys', results))
        .catch(err => {
          console.log('err from loadToys')
          throw err
        })
    },
    removeToy({ commit }, { toyId }) {
      return toyService.remove(toyId)
        .then(() => commit('removeToy', toyId))
        .catch(err => {
          console.log('err from removeToy')
          throw err
        })
    },
    saveToy({ commit }, { toy }) {
      return toyService.save(toy)
        .then(() => commit('saveToy', toy))
        .catch(err => {
          console.log('err from saveToy')
          throw err
        })
    }
  },
  getters: {
    filterBy({ filterBy }) {
      return filterBy
    },
    toys({ toys }) {
      return toys
    },
    filteredToys({ toys, filterBy }) {
      const regex = new RegExp(filterBy.keyword, 'i')
      let filteredToys = toys.filter(toy => regex.test(toy.name)) // By name
      if (filterBy.tags.length > 0) // By tags
        filteredToys = filteredToys.filter(toy => toy.tags.some(lbl => filterBy.tags.includes(lbl)))

      filteredToys.sort((a, b) => {
        if (filterBy.sortBy === 'Created') return a.createdAt - b.createdAt
        else if (filterBy.sortBy === 'Price') return a.price - b.price

        return a.name < b.name ? 1 : -1 // Default soft by name
      })

      filteredToys = filteredToys.filter(toy => toy.inStock === filterBy.inStock) // By inStock
      return filteredToys
    },
    // totalPages({ totalPages }) {
    //   return totalPages
    // }
  }
}

