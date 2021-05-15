export default class EditComment {
  constructor ({ $comment, inicialState, onClickEdit }) {
    this.state = inicialState
    this.$target = document.createElement('div')
    this.$target.className = 'edit-comment'
    console.log($comment.dataset)

    const socialIcon = document.createElement('img')
    socialIcon.className = 'social-icon'
    socialIcon.dataset.social = $comment.dataset.social

    switch ($comment.dataset.social) {
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
    username.innerText = $comment.dataset.username

    const createdTime = document.createElement('span')
    createdTime.className = 'created-time'
    createdTime.innerText = $comment.dataset.createdTime

    const content = document.createElement('input')
    content.className = 'input'
    content.setAttribute('type', 'text')
    content.value = $comment.dataset.content

    const submitBtn = document.createElement('button')
    submitBtn.className = 'reply-button'
    submitBtn.innerText = '수정'
    submitBtn.addEventListener('click', (e) => {
      onClickEdit($comment.dataset.id, content.value)
    })

    this.$target.appendChild(socialIcon)
    this.$target.appendChild(username)
    this.$target.appendChild(createdTime)
    this.$target.appendChild(content)
    this.$target.appendChild(submitBtn)
    $comment.appendChild(this.$target)
    this.render()
  }

  setState (nextState) {
    this.state = nextState
  }

  render () {

  }
}
