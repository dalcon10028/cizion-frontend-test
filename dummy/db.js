let commentsTop = 9

const me = [
  { token: 'naver-token', username: '네이연권', social: 'naver' },
  { token: 'kakao-token', username: '카카연권', social: 'kakao' },
  { token: 'facebook-token', username: '페북연권', social: 'facebook' },
  { token: 'google-token', username: '구글연권', social: 'google' },
  { token: 'twitter-token', username: '트윗연권', social: 'twitter' }
]

const badWords = [
  '쓰레기', '개새끼', '시발', '나쁜말', '나쁜 말'
]

const dummyComments = [
  {
    id: 1,
    username: '일연권',
    comment: '이게 사실 인가요?',
    createdTime: '2021-05-13 09:47:28',
    depth: 0,
    social: 'naver',
    likeCount: 3,
    unlikeCount: 4,
    likeusers: new Set([1, 2, 3]),
    unlikeusers: new Set([1, 2, 3]),
    childComments: [
      { id: 7, username: '육연권', comment: '사실입니다.', createdTime: '2021-05-13 09:47:34', depth: 1, social: 'naver', likeCount: 3, unlikeCount: 4, likeusers: new Set([1, 2, 3]), unlikeusers: new Set([1, 2, 3]), targetUsername: '일연권' },
      { id: 8, username: '네이연권', comment: '아니오 거짓 입니다.', createdTime: '2021-05-13 09:47:35', depth: 1, social: 'naver', likeCount: 3, unlikeCount: 4, likeusers: new Set([1, 2, 3]), unlikeusers: new Set([1, 2, 3]), targetUsername: '육연권' }
    ]
  },
  { id: 2, username: '네이연권', comment: '이게 사실 인가요?', createdTime: '2021-05-13 09:47:29', depth: 0, social: 'naver', likeCount: 3, unlikeCount: 4, likeusers: new Set([1, 2, 3]), unlikeusers: new Set([1, 2, 3]), childComments: [] },
  { id: 3, username: '사연권', comment: '이게 사실 인가요?', createdTime: '2021-05-13 09:47:30', depth: 0, social: 'kakao', likeCount: 3, unlikeCount: 4, likeusers: new Set([1, 2, 3]), unlikeusers: new Set([1, 2, 3]),childComments: [] },
  { id: 4, username: '오연권', comment: '이게 사실 인가요?', createdTime: '2021-05-13 09:47:31', depth: 0, social: 'facebook', likeCount: 3, unlikeCount: 4, likeusers: new Set([1, 2, 3]), unlikeusers: new Set([1, 2, 3]),childComments: [] },
  { id: 5, username: '육연권', comment: '이게 사실 인가요?', createdTime: '2021-05-13 09:47:32', depth: 0, social: 'google', likeCount: 3, unlikeCount: 4, likeusers: new Set([1, 2, 3]), unlikeusers: new Set([1, 2, 3]), childComments: [] },
  { id: 6, username: '칠연권', comment: '이게 사실 인가요?', createdTime: '2021-05-13 09:47:33', depth: 0, social: 'twitter', likeCount: 3, unlikeCount: 4, likeusers: new Set([1, 2, 3]), unlikeusers: new Set([1, 2, 3]),childComments: [] }
]

function addComment (username, comment, createdTime, social) {
  for (const word of badWords) {
    if (comment.includes(word)) { return false }
  }
  const data = {
    id: commentsTop++,
    username,
    comment,
    depth: 0,
    createdTime,
    social,
    likeCount: 0,
    unlikeCount: 0,
    likeusers: new Set(),
    unlikeusers: new Set(),
    childComments: []
  }
  dummyComments.push(data)
  return true
}

function addReComment (username, comment, createdTime, social, targetUsername) {
  for (const word of badWords) {
    if (comment.includes(word)) { return false }
  }
  const data = {
    id: commentsTop++,
    username,
    comment,
    depth: 1,
    createdTime,
    social,
    targetUsername
  }
  dummyComments.push(data)
  return true
}

function login (token) {
  for (const user of me) {
    if (user.token === token) {
      return user
    }
  }
}

function removeComment (id) {
  for (let i = 0; dummyComments.length; i++) {
    const comment = dummyComments[i]
    if (comment.id === Number(id)) {
      dummyComments.splice(i, 1)
      return true
    }
  }
}

function like (username, id) {
  for (const comment of dummyComments) {
    if (comment.id === Number(id)) {
      if (comment.likeusers.has(username)) {
        comment.likeCount--
        comment.likeusers.delete(username)
        return true
      }
      if (comment.unlikeusers.has(username)) {
        comment.likeCount++
        comment.unlikeCount--
        comment.likeusers.add(username)
        comment.unlikeusers.delete(username)
        return true
      }
      comment.likeCount++
      comment.likeusers.add(username)
      return true
    }

    for (const recomment of comment.childComments) {
      if (recomment.id === Number(id)) {
        if (recomment.likeusers.has(username)) {
          recomment.likeCount--
          recomment.delete(username)
        }
        if (recomment.unlikeusers.has(username)) {
          recomment.likeCount++
          recomment.unlikeCount--
          recomment.likeusers.add(username)
          recomment.unlikeCount.delete(username)
          return true
        }
        recomment.likeCount++
        recomment.likeusers.add(username)
        return true
      }
    }
  }
  return false
}

function unlike (username, id) {
  for (const comment of dummyComments) {
    if (comment.id === Number(id)) {
      if (comment.likeusers.has(username)) {
          comment.unlikeCount++
          comment.likeCount--
          comment.unlikeusers.add(username)
          comment.likeusers.delete(username)
          return true
      }
      if (comment.unlikeusers.has(username)) {
        comment.unlikeCount--
        comment.unlikeusers.delete(username)
        return true
      }
      comment.unlikeCount++
      comment.unlikeusers.add(username)
      return true
    }

    for (const recomment of comment.childComments) {
      if (recomment.id === Number(id)) {
        if (recomment.likeusers.has(username)) {
          recomment.unlikeCount++
          recomment.likeCount--
          recomment.unlikeusers.add(username)
          recomment.likeusers.delete(username)
          return true
        }
        if (recomment.unlikeusers.has(username)) {
            recomment.unlikeCount--
            recomment.unlikeusers.delete(username)
            return true
        }
        recomment.unlikeCount++
        recomment.unlikeusers.add(username)
        return true
      }
    }
  }
  return false
}


export { dummyComments, addComment, addReComment, login, like, unlike, removeComment }
