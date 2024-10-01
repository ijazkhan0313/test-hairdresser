import { useBufferStore } from '~/stores/buffer'

export class BufferLoader {
  context: AudioContext
  urlList: string[]
  onload: (bufferList: AudioBuffer[], urlList:string[]) => void
  bufferList: AudioBuffer[]
  loadCount: number

  constructor (context: AudioContext, urlList: string[], callback: (bufferList: AudioBuffer[], urlList:string[]) => void) {
    this.context = context
    this.urlList = urlList
    this.onload = callback
    this.bufferList = new Array(urlList.length)
    this.loadCount = 0
  }

  loadBuffer (url: string, index: number): void {
    // Load buffer asynchronously
    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'

    request.onload = () => {
      // Asynchronously decode the audio file data in request.response
      const fileName = useBufferStore().extractFilename(url)

      this.context.decodeAudioData(
        request.response,
        (buffer: AudioBuffer) => {
          if (!buffer) {
            alert('error decoding file data: ' + url)
            return
          }
          this.bufferList[index] = buffer
          if (++this.loadCount === this.urlList.length) { this.onload(this.bufferList, this.urlList) }
        },
        (_error) => {
          // console.error('decodeAudioData error', error)
        }
      )
      useBufferStore().saveBufferInIndexedDb(fileName, request.response)
    }

    request.onerror = () => {
      alert('BufferLoader: XHR error')
    }

    request.send()
  }

  load (): void {
    this.urlList.forEach((url, index) => {
      this.loadBuffer(url, index)
    })
  }
}
