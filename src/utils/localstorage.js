function setAuthToken (token) {
  localStorage.setItem('social-token', token)
}

function getAuthToken () {
  return localStorage.getItem('social-token')
}

function delAuthToken () {
  localStorage.removeItem('social-token')
}

export { setAuthToken, getAuthToken, delAuthToken }
