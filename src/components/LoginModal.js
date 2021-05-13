export default class LoginModal {
  constructor ({ $app, initialState, closeModal, login }) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = 'modal'
    this.$target.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        closeModal()
      }
    })

    this.content = document.createElement('div')
    this.content.className = 'content'
    this.content.addEventListener('click', (e) => {
      const node = e.target.closest('.login-button')
      if (node) {
        const { social } = node.dataset
        login(`${social}-token`)
      }
    })

    this.$target.appendChild(this.content)
    $app.appendChild(this.$target)
    this.render()
  }

  setState (nextState) {
    this.state = nextState
    this.render()
  }

  render () {
    const social = [
      { social: 'naver', value: '네이버로 로그인' },
      { social: 'kakao', value: '카카오톡으로 로그인' },
      { social: 'facebook', value: '페이스북으로 로그인' },
      { social: 'google', value: '구글로 로그인' },
      { social: 'twitter', value: '트위터로 로그인' }
    ]

    this.content.innerHTML = `
    <h2>SNS로그인해서 댓글쓰기</h2>
    ${social.map(node => `<input type="button" class="login-button" data-social="${node.social}" value="${node.value}" />`).join('')}
    `

    this.$target.style.display = this.state ? 'block' : 'none'
  }
}
