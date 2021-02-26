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

test('this one is written for you - using a promise', done => {
  const fakeServer = { receive: jest.fn() }
  const httpClient = new HttpClient(fakeServer)

  httpClient.post('data sent to server').then(response => {
    expect(fakeServer.receive).toHaveBeenCalledWith('data sent to server')
    expect(response).toBe('200 OK')
    done()
  })
})

test('chaining two functions with promises - reading from a file and sending to the server', done => {
  const fakeServer = { receive: jest.fn() }
  const httpClient = new HttpClient(fakeServer)
  const fileReader = new FileReader()

  const fileName = `promises_are_fun`

  fileReader
    .readFile(fileName)
    .then(contents => httpClient.post(contents))
    .then(response => {
      expect(fakeServer.receive).toHaveBeenCalledWith('contents of file')
      expect(response).toBe('200 OK')
      done()
    })
})

test('getting crazy now - chaining 3 functions with promises - download a file, read it, send data to server', done => {
  const fakeServer = { receive: jest.fn() }
  const httpClient = new HttpClient(fakeServer)
  const fileReader = new FileReader()
  const fileDownloader = new FileDownloader()
  const fileDownloaderSpy = jest.spyOn(fileDownloader, 'download')
  const fileReaderSpy = jest.spyOn(fileReader, 'readFile')

  const fileName = `promises_are_fun`

  fileDownloader
    .download(fileName)
    .then(filePath => fileReader.readFile(filePath))
    .then(contents => httpClient.post(contents))
    .then(response => {
      expect(fileDownloaderSpy.mock.calls[0][0]).toEqual(fileName)
      expect(fileReaderSpy.mock.calls[0][0]).toEqual(
        '/path/to/downloaded/promises_are_fun'
      )
      expect(fakeServer.receive).toHaveBeenCalledWith('contents of file')
      expect(response).toBe('200 OK')
      done()
    })
})
