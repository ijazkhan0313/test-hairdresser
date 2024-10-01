import { createDevice, type Device } from '@rnbo/js'
import { Howl } from 'howler'
import { ANC } from '~/stores/interfaces/ANC'
import { HeadsetType } from '~/stores/interfaces/HeadsetType'
import { useUserStore } from '~/stores/user'

async function createStreamingAudioSource (fileName: string): Promise<Howl> {
  // Load your audio file with streaming enabled
  const baseURL = window.location.origin
  const sound: Howl = await new Howl({
    src: [baseURL + '/sounds/' + fileName],
    html5: false, // Enables streaming
    loop: true

  })
  // console.log('Created music by Howl')
  // Assuming you have the Web Audio API context (Howler.ctx)
  // and it's not null or undefined, you can proceed to create a custom AudioNode
  return sound

  // Note: This is a simplified example. Depending on what you're doing,
  // you might not want to connect directly to the destination but to other nodes for further processing.
}

function getAttenuationFactor () {
  const user = useUserStore().user as any
  const anc = user.settings.anc_type
  const ht = user.settings.headphone_type
  if (anc === ANC.Yes && ht === HeadsetType.OverEar) { return 0.0562 }
  if (anc === ANC.No && ht === HeadsetType.OverEar) { return 0.5623 }
  if (anc === ANC.Yes && ht === HeadsetType.InEar) { return 0.1778 }
  if (anc === ANC.No && ht === HeadsetType.InEar) { return 0.0316 }
  return 0.5623
}

async function createAudioSource (ctx: AudioContext, path: string) : Promise<AudioBufferSourceNode> {
  // Works but is slow
  const response: Response = await fetch(path)
  const source: AudioBufferSourceNode = ctx.createBufferSource()
  // Check if the partial content was successfully fetched
  if (response.status === 206 || response.status === 200) {
    // Retrieve the chunk as an ArrayBuffer
    const buffer: ArrayBuffer = await response.arrayBuffer()

    // Decode the audio data
    const decodedAudio: AudioBuffer = await ctx.decodeAudioData(buffer)
    // checkClipping(decodedAudio)
    // console.log('Noise decoded successfully')

    source.buffer = decodedAudio
    source.loop = true
    return source
  } else {
    throw new Error(`Failed to fetch audio chunk: HTTP status ${response.status}`)
  }

/*
  const decodedAudio: AudioBuffer = await fetchAndDecodeAudioChunk(ctx, path, startByte, endByte)
  const source: AudioBufferSourceNode = ctx.createBufferSource()

  source.buffer = decodedAudio
  return source
  */
}

function createRNBODevice (ctx: AudioContext, patcher: any) : Promise<Device> {
  return createDevice({
    context: ctx,
    patcher
  })
}
function connectAudioNodes (from:AudioNode, to:AudioNode, output?:number, input?:number) : void {
  /*
// console.log('Connecting the Node: ', { from }, ' with ' + from.numberOfInputs + ' inputs',
    ' and with ' + from.numberOfOutputs + ' outputs ...  with ')
// console.log('the Node: ', { to }, ' with ' + to.numberOfInputs + ' inputs',
    ' and with ' + to.numberOfOutputs + ' outputs ... defined Channels are o/i: ' + output + ' and ' + input)
    */
  // console.log('new Node connected ', { allNodes })
  try {
    if (output !== undefined && input !== undefined) {
      from.connect(to, output, input)
    // console.log('Connect specific channels o/i ' + output, input, { to }, { from })
    } else if (output !== undefined) {
      from.connect(to, output)
    // console.log('Connect with specific output channel ' + output, { to }, { from })
    } else {
      from.connect(to)
    // console.log('Connect without specific channels', { to }, { from })
    }
  } catch (error) {

  // console.log('Error while connecting' + error)
  }
}
function checkClipping (buffer: AudioBuffer) : boolean {
  let isClipping = false
  for (let channelNumber = 0; channelNumber < buffer.numberOfChannels; channelNumber++) {
    const element:Float32Array = buffer.getChannelData(channelNumber)

    // Iterate through buffer to check if any of the |values| exceeds 1.
    for (let i = 0; i < buffer.length; i++) {
      const absValue = Math.abs(element[i])
      if (absValue >= 1.0) {
        isClipping = true
        break
      }
    }
  }
  return isClipping
}

/**
 * EXPORTS
 */

export {
  // createMicrophoneSource,
  createAudioSource,
  createRNBODevice,
  createStreamingAudioSource,
  connectAudioNodes,
  checkClipping,
  getAttenuationFactor
}
