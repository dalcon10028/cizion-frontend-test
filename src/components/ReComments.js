export default class ReComments {
  constructor ({ $target, initialState }) {
    this.state = initialState
    this.$recomments = document.createElement('div')
    this.$recomments.className = 'recomment'

    $target.appendChild(this.$recomments)
    this.render()
  }

  setState (nextState) {
    this.state = nextState
    this.render()
  }

  render () {
    if (this.state.length !== 0) {
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

      const createdTime = document.createElement('span')
      createdTime.className = 'created-time'
      createdTime.innerText = this.state.createdTime

      const content = document.createElement('p')
      content.innerHTML = `<span class="tag">@${this.state.targetUsername}</span> ${this.state.comment}`

      const replyBtn = document.createElement('button')
      replyBtn.className = 'reply-button'
      replyBtn.innerText = '답글'

      const editBtn = document.createElement('button')
      editBtn.className = 'edit-button'
      editBtn.innerText = '✍'

      const removeBtn = document.createElement('button')
      removeBtn.className = 'remove-button'
      removeBtn.innerText = '❌'

      const like = document.createElement('div')
      like.className = 'right'
      like.innerHTML = `<button class="like-button">💓</button>
                    <span class="like-text">${this.state.likeCount}</span>
                    <button class="like-button">💔</button>
                    <span class="like-text">${this.state.unlikeCount}</span>`
      this.$recomments.appendChild(socialIcon)
      this.$recomments.appendChild(username)
      this.$recomments.appendChild(createdTime)
      this.$recomments.appendChild(content)
      this.$recomments.appendChild(replyBtn)
      this.$recomments.appendChild(like)
      this.$recomments.appendChild(editBtn)
      this.$recomments.appendChild(removeBtn)
    }
  }
}
