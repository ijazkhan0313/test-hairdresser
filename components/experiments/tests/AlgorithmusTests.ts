export function createMockMediaStream (): MediaStream {
  // Create an empty MediaStream
  const mockStream = new MediaStream()

  // Create a mock audio track using the Web Audio API
  const audioContext = new AudioContext()
  const oscillator = audioContext.createOscillator()
  const dst = audioContext.createMediaStreamDestination()
  oscillator.connect(dst)
  oscillator.start()

  // Add the audio track from the destination to the stream
  dst.stream.getAudioTracks().forEach((track) => {
    mockStream.addTrack(track)
  })

  // You can now return this mockStream as a simulated microphone MediaStream
  return mockStream
}
