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
    childComments: [
      { id: 7, username: '육연권', comment: '사실입니다.', createdTime: '2021-05-13 09:47:34', depth: 1, social: 'naver', targetUsername: '일연권' },
      { id: 8, username: '칠연권', comment: '아니오 거짓 입니다.', createdTime: '2021-05-13 09:47:35', depth: 1, social: 'naver', targetUsername: '육연권' }
    ]
  },
  { id: 2, username: '삼연권', comment: '이게 사실 인가요?', createdTime: '2021-05-13 09:47:29', depth: 0, social: 'naver', childComments: [] },
  { id: 3, username: '사연권', comment: '이게 사실 인가요?', createdTime: '2021-05-13 09:47:30', depth: 0, social: 'kakao', childComments: [] },
  { id: 4, username: '오연권', comment: '이게 사실 인가요?', createdTime: '2021-05-13 09:47:31', depth: 0, social: 'facebook', childComments: [] },
  { id: 5, username: '육연권', comment: '이게 사실 인가요?', createdTime: '2021-05-13 09:47:32', depth: 0, social: 'google', childComments: [] },
  { id: 6, username: '칠연권', comment: '이게 사실 인가요?', createdTime: '2021-05-13 09:47:33', depth: 0, social: 'twitter', childComments: [] }
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

export { dummyComments, addComment, addReComment, login }
