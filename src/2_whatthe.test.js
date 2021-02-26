
// TODO this test passes, but it should not! Make it fail!
// HINT: Use Jest's "done" function
// https://jestjs.io/docs/en/asynchronous
test('what the...? why does this pass?', () => {
  setTimeout(() => {
    expect(true).toBe(false)
  }, 3000)
})
