
export default class CommentInput {
  constructor ({ $app, initialState, showLoginModal, addComment, logout }) {
    this.state = initialState
    this.$target = document.createElement('form')
    this.$target.className = 'comment-input'
    this.logout = logout

    const userdata = document.createElement('div')
    userdata.className = 'userdata'

    this.icon = document.createElement('img')
    this.icon.className = 'social-icon'

    this.username = document.createElement('span')
    this.username.className = 'username'

    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', '댓글을 입력해 주세요')
    input.addEventListener('click', (e) => {
      if (!this.state.isLogin) {
        showLoginModal()
        input.blur()
      }
    })

    const button = document.createElement('input')
    button.setAttribute('type', 'button')
    button.value = '등록'
    button.addEventListener('click', (e) => {
      if (!this.state.isLogin) {
        showLoginModal()
        return
      }
      if (!this.state.throttle && input.value !== '') {
        setTimeout(() => {
          addComment(input.value)
          input.value = ''
          this.state.throttle = null
        }, 1000)
      }
      this.state.throttle = true
    })

    this.logoutBtn = document.createElement('input')
    this.logoutBtn.setAttribute('type', 'button')
    this.logoutBtn.className = 'logout-botton'
    this.logoutBtn.value = '로그아웃'

    this.logoutBtn.addEventListener('click', (e) => {
      this.logout()
    })

    userdata.appendChild(this.icon)
    userdata.appendChild(this.username)
    this.$target.appendChild(userdata)
    this.$target.appendChild(input)
    this.$target.appendChild(button)
    this.$target.appendChild(this.logoutBtn)
    $app.appendChild(this.$target)
    this.render()
  }

  setState (nextState) {
    this.state = nextState
    this.render()
  }

  render () {
    if (this.state.isLogin) {
      this.icon.style.display = 'inline'
      this.username.style.display = 'inline'
      this.logoutBtn.style.display = 'inline'
      this.icon.src = `./assets/${this.state.social}.png`
      this.username.innerHTML = this.state.username
    } else {
      this.icon.style.display = 'none'
      this.username.style.display = 'none'
      this.logoutBtn.style.display = 'none'
    }
  }
}
