import { dummyComments, addComment, addReComment } from '../../dummy/db.js'

const api = {
  fetchComments () {
    return dummyComments
  },

  login (social) {
    switch (social) {
      case 'naver':
        return {
          username: '네이연권',
          social: 'naver'
        }
      case 'kakao':
        return {
          username: '카카연권',
          social: 'kakao'
        }
      case 'facebook':
        return {
          username: '페북연권',
          social: 'facebook'
        }
      case 'google':
        return {
          username: '구글연권',
          social: 'google'
        }
      case 'twitter':
        return {
          username: '트윗연권',
          social: 'twitter'
        }
    }
  },

  addComment (username, comment, createdTime, social) {
    return addComment(username, comment, createdTime, social)
  }
}

export default api
