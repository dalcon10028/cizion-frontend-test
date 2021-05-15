export default class AddReComment {
  constructor ({ $comment, initialState, onClickRecomment }) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = 'add-recomment'

    console.log(this.state)
    const socialIcon = document.createElement('img')
    socialIcon.className = 'social-icon'

    switch (this.state.social) {
      case 'naver':
        socialIcon.src = './assets/naver.png'
        break
      case 'kakao':
        socialIcon.src = './assets/kakao.png'
        break
      case 'facebook':
        socialIcon.src = './assets/facebook.png'
        break
      case 'google':
        socialIcon.src = './assets/google.png'
        break
      case 'twitter':
        socialIcon.src = './assets/twitter.png'
        break
    }
    const username = document.createElement('span')
    username.className = 'username'
    username.innerText = this.state.username

    const content = document.createElement('input')
    content.className = 'input'
    content.setAttribute('type', 'text')
    content.setAttribute('placeholder', '댓글을 입력해 주세요')

    const submitBtn = document.createElement('button')
    submitBtn.className = 'reply-button'
    submitBtn.innerText = '등록'
    submitBtn.addEventListener('click', (e) => {
      console.log(this.state.targetId)
      onClickRecomment(this.state.targetId, content.value)
    })

    this.$target.appendChild(socialIcon)
    this.$target.appendChild(username)
    this.$target.appendChild(content)
    this.$target.appendChild(submitBtn)
    $comment.appendChild(this.$target)
    this.render()
  }

  setState (nextState) {
    this.state = nextState
    this.render()
  }

  render () {

  }
}
