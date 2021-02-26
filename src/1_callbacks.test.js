class FileDownloader {
  download (fileName, callback) {
    const filePath = `/path/to/downloaded/${fileName}`
    callback(filePath)
  }
}

class FileReader {
  readFile (filePath, callback) {
    console.log(`reading from ${filePath}...`)
    const fileContents = 'contents of file'
    callback(fileContents)
  }
}

class HttpClient {
  constructor (server) {
    this.server = server
  }

  post (data, callback) {
    this.server.receive(data)
    callback('200 OK')
  }
}

test('send data to server', () => {
  const fakeServer = { receive: jest.fn() }
  const httpClient = new HttpClient(fakeServer)

  const testData = 'data sent to server'
  const emptyCallback = () => {}

  //TODO Change the next line to make the test pass
  httpClient.post('what should this be???', emptyCallback)

  expect(fakeServer.receive).toHaveBeenCalledWith(testData)
})

test('writing our first callback', () => {
  const fakeServer = { receive: jest.fn() }
  const fakeLogger = { log: jest.fn() }
  const httpClient = new HttpClient(fakeServer)

  // TODO change the callback function to log the response into the fakeLogger
  const callback = () => {}

  httpClient.post('data sent to server', callback)

  expect(fakeServer.receive).toHaveBeenCalledWith('data sent to server')
  expect(fakeLogger.log).toHaveBeenCalledWith('200 OK')
})

test('chaining two functions with callbacks - reading from a file and sending to the server', () => {
  const fakeServer = { receive: jest.fn() }
  const fakeLogger = { log: jest.fn() }
  const httpClient = new HttpClient(fakeServer)
  const fileReader = new FileReader()
  const fileReaderSpy = jest.spyOn(fileReader, 'readFile')

  const fileName = `callbacks_are_fun`

  // TODO send the file contents to the server with the httpClient
  fileReader.readFile(fileName, (contents) => {
    // What should we do with these file contents?
  })

  expect(fileReaderSpy.mock.calls[0][0]).toEqual('callbacks_are_fun')
  expect(fakeServer.receive).toHaveBeenCalledWith('contents of file')
  expect(fakeLogger.log).toHaveBeenCalledWith('200 OK')
})

test('getting crazy now - chaining 3 functions with callbacks - download a file, read it, send data to server', () => {
  const fakeServer = { receive: jest.fn() }
  const fakeLogger = { log: jest.fn() }
  const httpClient = new HttpClient(fakeServer)
  const fileReader = new FileReader()
  const fileDownloader = new FileDownloader()
  const fileReaderSpy = jest.spyOn(fileReader, 'readFile')
  const fileDownloaderSpy = jest.spyOn(fileDownloader, 'download')

  const fileName = `callbacks_are_fun`

  // TODO you're on your own now! 
  // Download the file with the fileDownloader, 
  // read the contents with the fileReader, 
  // and send the contents to the server

  expect(fileDownloaderSpy.mock.calls[0][0]).toEqual(fileName)
  expect(fileReaderSpy.mock.calls[0][0]).toEqual(
    '/path/to/downloaded/callbacks_are_fun'
  )
  expect(fakeServer.receive).toHaveBeenCalledWith('contents of file')
  expect(fakeLogger.log).toHaveBeenCalledWith('200 OK')
})
