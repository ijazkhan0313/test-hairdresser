class BandpassProcessor extends AudioWorkletProcessor {
  process (inputs, outputs) {
    const input = inputs[0]
    const output = outputs[0]
    // const frequency = parameters.frequency
    // const Q = parameters.Q

    for (let channel = 0; channel < input.length; channel++) {
      const inputChannel = input[channel]
      //     const outputChannel = output[channel]

      for (let i = 0; i < inputChannel.length; i++) {
        // Apply bandpass filter to inputChannel[i] and store the result in outputChannel[i]
        // using the provided frequency and Q parameters
      }
    }

    // Calculate the RMS value of the output audio data
    const rms = this.calculateRMS(output)

    // Calculate the dB values
    const dbValues = this.convertToDB(output)

    // Calculate the 10th and 90th percentile values
    const percentile10 = this.calculatePercentile(dbValues, 10)
    const percentile90 = this.calculatePercentile(dbValues, 90)

    // Send the processed data to the main thread
    this.port.postMessage({ rms, dbValues, percentile10, percentile90 })

    return true
  }

  calculateRMS (data) {
    let sumOfSquares = 0
    for (let channel = 0; channel < data.length; channel++) {
      const channelData = data[channel]
      for (let i = 0; i < channelData.length; i++) {
        sumOfSquares += channelData[i] * channelData[i]
      }
    }
    const meanSquare = sumOfSquares / (data.length * data[0].length)
    const rms = Math.sqrt(meanSquare)
    return rms
  }

  calculatePercentile (data, percentile) {
    const sortedData = data.slice().sort((a, b) => a - b)
    const index = Math.floor((percentile / 100) * sortedData.length)
    return sortedData[index]
  }

  convertToDB (data) {
    const dbValues = []
    for (let channel = 0; channel < data.length; channel++) {
      const channelData = data[channel]
      for (let i = 0; i < channelData.length; i++) {
        const amplitude = Math.abs(channelData[i])
        const db = 20 * Math.log10(amplitude + this.minAmplitude)
        dbValues.push(db)
      }
    }
    return dbValues
  }
}

export default registerProcessor('bandpass-processor', BandpassProcessor)
