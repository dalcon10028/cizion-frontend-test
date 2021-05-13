function setAuthToken (token) {
  localStorage.setItem('social-token', token)
}

function getAuthToken () {
  return localStorage.getItem('social-token')
}

export { setAuthToken, getAuthToken }
