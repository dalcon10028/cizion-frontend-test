export default class Hello {
  constructor ({ $app }) {
    this.$target = document.createElement('h1')
    $app.appendChild(this.$target)
    this.render()
  }

  render () {
    this.$target.innerHTML = 'Hello SIZION!'
  }
}
