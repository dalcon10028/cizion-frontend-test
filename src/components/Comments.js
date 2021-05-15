import ReComments from './ReComments.js'
import EditComment from './EditComment.js'
import AddReComment from './AddReComment.js'

export default class Comments {
  constructor ({ $app, initialState, onClickLike, onClickUnlike, onClickRemove, onClickEdit, onClickRecomment }) {
    this.state = initialState
    this.onClickLike = onClickLike
    this.onClickUnlike = onClickUnlike
    this.onClickRemove = onClickRemove
    this.onClickEdit = onClickEdit
    this.$target = document.createElement('div')
    this.$target.className = 'comments'

    this.$target.addEventListener('click', (e) => {
      const node = e.target.closest('button')
      if (node && this.state.isLogin && node.dataset.type === 'like') {
        const { id } = node.parentNode.parentNode.dataset
        onClickLike(id)
      }
      if (node && this.state.isLogin && node.dataset.type === 'unlike') {
        const { id } = node.parentNode.parentNode.dataset
        onClickUnlike(id)
      }
      if (node && this.state.isLogin && node.className === 'remove-button') {
        const { id } = node.parentNode.dataset
        onClickRemove(id)
      }
      if (node && this.state.isLogin && node.className === 'edit-button') {
        const commentBox = node.parentNode
        commentBox.innerHTML = ''
        const editcomment = new EditComment({ $comment: commentBox, onClickEdit })
      }
      if (node && node.className === 'reply-button') {
        if (!this.state.isLogin) {
          alert('로그인을 해주세요')
          return
        }
        const commentBox = node.parentNode
        document.querySelectorAll('.add-recomment').forEach((node) => {
          node.parentNode.removeChild(node)
        })
        const addrecomment = new AddReComment({
          $comment: commentBox,
          initialState: {
            targetId: commentBox.dataset.id,
            social: this.state.social,
            username: this.state.username
          },
          onClickRecomment
        })
      }
    })

    $app.appendChild(this.$target)
    this.render()
  }

  setState (nextState) {
    this.state = nextState
    this.render()
  }

  render () {
    if (this.state.comments) {
      this.$target.innerHTML = ''
      this.state.comments.forEach(node => {
        const comment = document.createElement('div')
        comment.className = 'comment'
        comment.dataset.id = node.id
        comment.dataset.social = node.social
        comment.dataset.username = node.username
        comment.dataset.createdTime = node.createdTime
        comment.dataset.content = node.comment

        const socialIcon = document.createElement('img')
        socialIcon.className = 'social-icon'
        socialIcon.dataset.social = node.social

        switch (node.social) {
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
        username.innerText = node.username

        const createdTime = document.createElement('span')
        createdTime.className = 'created-time'
        createdTime.innerText = node.createdTime

        const content = document.createElement('p')
        content.innerText = node.comment

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
        like.innerHTML = `<button class="like-button" data-type="like">💓</button>
                    <span class="like-text">${node.likeCount}</span>
                    <button class="like-button" data-type="unlike">💔</button>
                    <span class="like-text">${node.unlikeCount}</span>`

        comment.appendChild(socialIcon)
        comment.appendChild(username)
        comment.appendChild(createdTime)
        comment.appendChild(content)
        comment.appendChild(replyBtn)
        comment.appendChild(like)
        if (this.state.username === node.username) {
          comment.appendChild(editBtn)
          comment.appendChild(removeBtn)
        }
        this.$target.appendChild(comment)
        node.childComments.forEach(comment =>
          new ReComments({
            $target: this.$target,
            initialState: {
              username: this.state.username,
              comment
            }
          })
        )
      })
    }
  }
}
