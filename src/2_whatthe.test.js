test('what the...? why does this pass?', () => {
  setTimeout(() => {
    expect(true).toBe(false)
  }, 3000)
})

test('Make this test fail!!!', done => {
  setTimeout(() => {
    expect(true).toBe(false)
    done()
  }, 3000)
})
