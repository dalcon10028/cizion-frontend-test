import Comments from './components/Comments.js'
import CommentInput from './components/CommentInput.js'
import LoginModal from './components/LoginModal.js'

import api from './api/index.js'
import { formatDate } from './utils/dateutil.js'
import { setAuthToken, getAuthToken, delAuthToken } from './utils/localstorage.js'
export default class App {
  constructor ($app) {
    this.state = {
      isLogin: false,
      modal: false,
      comment: ''
    }

    this.loginModal = new LoginModal({
      $app,
      initialState: this.state.modal,
      closeModal: () => {
        this.setState({
          ...this.state,
          modal: false
        })
      },
      login: (token) => {
        const res = api.login(token)
        setAuthToken(res.token)
        this.setState({
          ...this.setState,
          isLogin: true,
          modal: false,
          username: res.username,
          social: res.social
        })
      }
    })

    this.commentInput = new CommentInput({
      $app,
      initialState: {
        isLogin: this.state.isLogin,
        social: this.state.social,
        username: this.state.username
      },
      showLoginModal: () => {
        this.setState({
          ...this.state,
          modal: true
        })
      },
      addComment: (comment) => {
        if (!api.addComment(this.state.username, comment, formatDate(new Date()), this.state.social)) {
          alert('욕설이 포함되어있습니다.')
        }
        this.setState({
          ...this.state,
          comments: api.fetchComments()
        })
      },
      logout: () => {
        delAuthToken()
        this.setState({
          ...this.state,
          isLogin: false,
          comments: api.fetchComments()
        })
      }
    })

    this.comments = new Comments({
      $app,
      initialState: {
        username: this.state.username,
        comments: this.state.comments,
        social: this.state.social
      },
      onClickLike: (id) => {
        api.like(this.state.username, id)
        this.setState({
          ...this.state,
          comments: api.fetchComments()
        })
      },
      onClickUnlike: (id) => {
        api.unlike(this.state.username, id)
        this.setState({
          ...this.state,
          comments: api.fetchComments()
        })
      },
      onClickRemove: (id) => {
        api.removeComment(id)
        this.setState({
          ...this.state,
          comments: api.fetchComments()
        })
      },
      onClickEdit: (id, content) => {
        api.editComment(id, content)
        this.setState({
          ...this.state,
          comments: api.fetchComments()
        })
      },
      onClickRecomment: (id, content) => {
        api.addReComment(this.state.username, content, formatDate(new Date()), this.state.social, id)
        this.setState({
          ...this.state,
          comments: api.fetchComments()
        })
      }
    })

    const init = () => {
      if (getAuthToken() !== null) {
        const res = api.login(getAuthToken())
        this.setState({
          ...this.state,
          throttle: null,
          isLogin: true,
          username: res.username,
          social: res.social,
          comments: api.fetchComments()
        })
        return
      }

      this.setState({
        ...this.state,
        comments: api.fetchComments()
      })
    }

    init()
  }

  setState (nextState) {
    this.state = nextState
    this.loginModal.setState(this.state.modal)
    this.commentInput.setState({
      isLogin: this.state.isLogin,
      social: this.state.social,
      username: this.state.username,
      throttle: this.state.throttle
    })
    this.comments.setState({
      isLogin: this.state.isLogin,
      comments: this.state.comments,
      username: this.state.username,
      social: this.state.social
    })
  }
}
