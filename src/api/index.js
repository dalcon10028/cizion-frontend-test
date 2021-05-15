import { dummyComments, addComment, login, like, unlike, removeComment, editComment } from '../../dummy/db.js'

const api = {
  fetchComments () {
    return dummyComments
  },

  login (token) {
    return login(token)
  },

  addComment (username, comment, createdTime, social) {
    return addComment(username, comment, createdTime, social)
  },

  like (username, id) {
    return like(username, id)
  },

  unlike (username, id) {
    return unlike(username, id)
  },

  removeComment (id) {
    return removeComment(id)
  },

  editComment (id, content) {
    return editComment(id, content)
  }
}

export default api
