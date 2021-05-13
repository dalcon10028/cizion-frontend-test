import Hello from './components/Hello.js'

export default class App {
  constructor ($app) {
    const hello = new Hello({ $app })
  }
}
