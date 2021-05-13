import Comments from './components/Comments.js'
import CommentInput from './components/CommentInput.js'
import LoginModal from './components/LoginModal.js'
import api from './api/index.js'

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
      login: (social) => {
        this.setState({
          ...this.setState,
          isLogin: true,
          modal: false,
          social: social
        })
        console.log(`${this.state.social}로 로그인`)
      }
    })

    this.commentInput = new CommentInput({
      $app,
      initialState: {
        isLogin: this.state.isLogin
      },
      showLoginModal: () => {
        this.setState({
          ...this.state,
          modal: true
        })
      }
    })

    this.comments = new Comments({
      $app,
      initialState: {
        comments: this.state.comments
      }
    })

    const init = () => {
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
      isLogin: this.state.isLogin
    })
    this.comments.setState({
      comments: this.state.comments
    })
  }
}
