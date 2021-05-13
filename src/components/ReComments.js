export default class ReComments {
  constructor ({ $app, initialState }) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = 'comments'

    $app.appendChild(this.$target)
    this.render()
  }

  setState (nextState) {
    this.state = nextState
    this.render()
  }

  render () {
    if (this.state.comments) {
      const template = this.state.comments.map(node => {
        let iconPath
        switch (node.social) {
          case 'naver':
            iconPath = './assets/naver.png'
            break
          case 'kakao':
            iconPath = './assets/kakao.png'
            break
          case 'facebook':
            iconPath = './assets/facebook.png'
            break
          case 'google':
            iconPath = './assets/google.png'
            break
          case 'twitter':
            iconPath = './assets/twitter.png'
            break
        }

        return `
<div class="comment" data-node-id=${node.id}>
<img class="social-icon" src="${iconPath}" />
<span class="username">${node.username}</span>
<span class="created-time">${node.createdTime}</span>
<p>${node.comment}</p>
<div class="right">
<button class="like-button">💓</button>
<span class="like-text">3</span>
<button class="like-button">💔</button>
<span class="like-text">3</span>
</div>
<button class="edit-button">✍</button>
<button class="remove-button">❌</button>
</div>
`
      }).join('')

      this.$target.innerHTML = template
    }
  }
}
