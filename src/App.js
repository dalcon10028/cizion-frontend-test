import Comments from './components/Comments.js'
import CommentInput from './components/CommentInput.js'

import api from './api/index.js'

export default class App {
  constructor ($app) {
    this.state = {
      isLogin: false,
      social: null,
      comment: ''
    }

    const commentInput = new CommentInput({
      $app,
      onInputClick: () => {
        if (!this.state.isLogin) {
          alert('로그인을 해주세요.')
          // 로그인 모달 표시
        }
      },
      onSubmitClick: () => {
        // 댓글 제출
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
    this.comments.setState({
      comments: this.state.comments
    })
  }
}
