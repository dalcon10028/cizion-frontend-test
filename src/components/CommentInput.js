export default class CommentInput {
  constructor ({ $app, initialState, showLoginModal }) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = 'CommentInput'

    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', '댓글을 입력해 주세요')
    input.addEventListener('click', (e) => {
      if (!this.state.isLogin) { showLoginModal() }
    })

    const button = document.createElement('input')
    button.setAttribute('type', 'button')
    button.value = '등록'
    button.addEventListener('click', (e) => {
      if (!this.state.isLogin) {
        showLoginModal()
        return
      }
      // 로그인상태일때
      console.log('제출합니다')
    })

    this.$target.appendChild(input)
    this.$target.appendChild(button)
    $app.appendChild(this.$target)
    this.render()
  }

  setState (nextState) {
    this.state = nextState
    this.render()
  }

  render () {

  }
}
