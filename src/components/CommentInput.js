export default class CommentInput {
  constructor ({ $app, initialState, onInputClick, onSubmitClick }) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = 'CommentInput'

    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', '댓글을 입력해 주세요')

    const button = document.createElement('input')
    button.setAttribute('type', 'button')
    button.value = '등록'

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
