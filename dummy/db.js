const myAccount = {
  naver: { username: '이연권', social: 'naver' },
  kakao: { username: '이연권', social: 'kakao' },
  facebook: { username: '이연권', social: 'facebook' },
  google: { username: '이연권', social: 'google' },
  twitter: { username: '이연권', social: 'twitter' }
}

let commentsTop = 9

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
  { id: 3, username: '사연권', comment: '이게 사실 인가요?', createdTime: '2021-05-13 09:47:30', depth: 0, social: 'naver', childComments: [] },
  { id: 4, username: '오연권', comment: '이게 사실 인가요?', createdTime: '2021-05-13 09:47:31', depth: 0, social: 'naver', childComments: [] },
  { id: 5, username: '육연권', comment: '이게 사실 인가요?', createdTime: '2021-05-13 09:47:32', depth: 0, social: 'naver', childComments: [] },
  { id: 6, username: '칠연권', comment: '이게 사실 인가요?', createdTime: '2021-05-13 09:47:33', depth: 0, social: 'naver', childComments: [] }
]

function addComment (username, comment, createdTime, social) {
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
}

function addReComment (username, comment, createdTime, social, targetUsername) {
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
}

export { myAccount, dummyComments, addComment, addReComment }