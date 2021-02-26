class FileDownloader {
  download (fileName) {
    return new Promise((resolve, reject) => {
      const filePath = `/path/to/downloaded/${fileName}`
      resolve(filePath)
    })
  }
}

class FileReader {
  readFile (filePath) {
    console.log(`reading from ${filePath}...`)
    return new Promise((resolve, reject) => {
      const fileContents = 'contents of file'
      resolve(fileContents)
    })
  }
}

class HttpClient {
  constructor (server) {
    this.server = server
  }

  post (data) {
    return new Promise((resolve, reject) => {
      this.server.receive(data)
      resolve('200 OK')
    })
  }
}

test('post data to the server using async/await', done => {
  const fakeServer = { receive: jest.fn() }
  const httpClient = new HttpClient(fakeServer)

  // TODO rewrite this using async/await syntax
  httpClient.post('data sent to server').then(response => {
    expect(fakeServer.receive).toHaveBeenCalledWith('data sent to server')
    expect(response).toBe('200 OK')
    done()
  })
})

test('chaining two functions with async/await - reading from a file and sending to the server', () => {
  const fakeServer = { receive: jest.fn() }
  const httpClient = new HttpClient(fakeServer)
  const fileReader = new FileReader()

  const fileName = `promises_are_fun`

  const contents = 'TODO'
  const response = 'TODO'

  expect(contents).toBe('contents of file')
  expect(fakeServer.receive).toHaveBeenCalledWith('contents of file')
  expect(response).toBe('200 OK')
})

test('getting crazy now - chaining 3 functions with async/await - download a file, read it, send data to server', () => {
  const fakeServer = { receive: jest.fn() }
  const httpClient = new HttpClient(fakeServer)
  const fileReader = new FileReader()
  const fileDownloader = new FileDownloader()
  const fileDownloaderSpy = jest.spyOn(fileDownloader, 'download')
  const fileReaderSpy = jest.spyOn(fileReader, 'readFile')

  const fileName = `promises_are_fun`

  const downloadedPath = 'TODO'
  const contents = 'TODO'
  const response = 'TODO'

  expect(fileDownloaderSpy.mock.calls[0][0]).toEqual(fileName)
  expect(fileReaderSpy.mock.calls[0][0]).toEqual(
    '/path/to/downloaded/promises_are_fun'
  )
  expect(fakeServer.receive).toHaveBeenCalledWith('contents of file')
  expect(response).toBe('200 OK')
})
