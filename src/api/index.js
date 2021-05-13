import { dummyComments, addComment, addReComment, login } from '../../dummy/db.js'

const api = {
  fetchComments () {
    return dummyComments
  },

  login (token) {
    return login(token)
  },

  addComment (username, comment, createdTime, social) {
    return addComment(username, comment, createdTime, social)
  }
}

export default api
