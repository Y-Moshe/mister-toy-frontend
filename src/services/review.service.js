import { httpService } from './http.service'

export const reviewService = {
  add,
  query,
  remove
}

function query(filterBy) {
  return httpService.get('review', filterBy)
}

function remove(reviewId) {
  return httpService.delete('review/' + reviewId)
}

function add(review) {
  return httpService.post('review', review)
}
