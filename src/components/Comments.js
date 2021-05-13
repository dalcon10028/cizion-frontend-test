export default class Comments {
  constructor ({ $app, initialState }) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = 'Comments'

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
                  <p class="username">${node.username}</p>
                  <p>${node.comment}</p>
                  </div>
               `
      }).join('')

      this.$target.innerHTML = template
    }
  }
}
