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

test('post data to the server using async await', async () => {
  const fakeServer = { receive: jest.fn() }
  const httpClient = new HttpClient(fakeServer)

  const response = await httpClient.post('data sent to server')
  expect(fakeServer.receive).toHaveBeenCalledWith('data sent to server')
  expect(response).toBe('200 OK')
})

test('chaining two functions with async/await - reading from a file and sending to the server', async () => {
  const fakeServer = { receive: jest.fn() }
  const httpClient = new HttpClient(fakeServer)
  const fileReader = new FileReader()

  const fileName = `promises_are_fun`

  const contents = await fileReader.readFile(fileName)
  const response = await httpClient.post(contents)

  expect(contents).toBe('contents of file')
  expect(fakeServer.receive).toHaveBeenCalledWith('contents of file')
  expect(response).toBe('200 OK')
})

test('getting crazy now - chaining 3 functions with async/await - download a file, read it, send data to server', async () => {
  const fakeServer = { receive: jest.fn() }
  const httpClient = new HttpClient(fakeServer)
  const fileReader = new FileReader()
  const fileDownloader = new FileDownloader()
  const fileDownloaderSpy = jest.spyOn(fileDownloader, 'download')
  const fileReaderSpy = jest.spyOn(fileReader, 'readFile')

  const fileName = `promises_are_fun`

  const downloadedPath = await fileDownloader.download(fileName)
  const contents = await fileReader.readFile(downloadedPath)
  const response = await httpClient.post(contents)

  expect(fileDownloaderSpy.mock.calls[0][0]).toEqual(fileName)
  expect(fileReaderSpy.mock.calls[0][0]).toEqual(
    '/path/to/downloaded/promises_are_fun'
  )
  expect(fakeServer.receive).toHaveBeenCalledWith('contents of file')
  expect(response).toBe('200 OK')
})
