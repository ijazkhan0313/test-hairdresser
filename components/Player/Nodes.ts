import { useAudioStore } from '~/stores/audio'
import { createRNBODevice } from '~/lib/AudioFunctions'
import importedMusicPatcher from 'assets/patch/music_patch.export.json'
import importedNoisePatcher from 'assets/patch/noise_patch.export.json'
import { ANC } from '~/stores/interfaces/ANC'
import { HeadsetType } from '~/stores/interfaces/HeadsetType'
import { useUserStore } from '~/stores/user'
import { useMicStore } from '~/stores/microphone'

enum AttenuationFactor{
  OverEarANC = 0.0562,
  OverEar = 0.5623,
  InEar = 0.1778,
  InEarANC = 0.0316
}

function getAttenuationFactor (anc:ANC, ht:HeadsetType): Number {
  useUserStore()
  if (anc === ANC.Yes && ht === HeadsetType.OverEar) { return AttenuationFactor.OverEarANC }
  if (anc === ANC.No && ht === HeadsetType.OverEar) { return AttenuationFactor.OverEar }
  if (anc === ANC.Yes && ht === HeadsetType.InEar) { return AttenuationFactor.InEarANC }
  if (anc === ANC.No && ht === HeadsetType.InEar) { return AttenuationFactor.InEar }
  return 0.5623
}

export default async function setupNodes (noiseAudioSource: MediaElementAudioSourceNode, musicAudioSource: MediaElementAudioSourceNode): Promise<Array<GainNode>> {
  const audioStore = useAudioStore()
  // useMicStore().getMicrophone().then((microphone: Microphone) => {
  //   const audioCtx = microphone.microphoneNode?.ctx
  // })
  noiseAudioSource.disconnect()
  musicAudioSource.disconnect()

  const noiseSourceNode = audioStore.addNode('noiseAudioSource', noiseAudioSource)

  const microphone = await useMicStore().getMicrophone()
  const audioContext = microphone.microphoneNode?.context
  /**
       *
       * GAIN NODES
   * */
  const musicGainNode : GainNode = audioContext.createGain()
  const noiseGainNode : GainNode = audioContext.createGain()
  musicGainNode.gain.value = 0
  noiseGainNode.gain.value = 0
  audioStore.addNode('musicGainNode', musicGainNode)
  audioStore.addNode('noiseGainNode', noiseGainNode)

  // get the current context
  // TODO: hand over proper scene and noise nodes

  // const musicAudioSource:AudioNodeItem = await audioStore.getBufferSourceNode(this.scenery)

  const noiseDevice = await createRNBODevice(audioContext, importedNoisePatcher)
  const musicDeviceNode = await createRNBODevice(audioContext, importedMusicPatcher)

  const noiseDeviceNode = audioStore.addNode('noiseDevice', noiseDevice.node)

  const noiseInputChannelSplitter = new ChannelSplitterNode(
    audioContext,
    { numberOfOutputs: 2 }
  )
  const musicInputChannelSplitter = new ChannelSplitterNode(
    audioContext,
    { numberOfOutputs: 2 }
  )
  const musicInputChannelSplitterNode = audioStore.addNode('musicInputChannelSplitter', musicInputChannelSplitter)
  const noiseInputChannelSplitterNode = audioStore.addNode('noiseInputChannelSplitter', noiseInputChannelSplitter)

  // RNBO devices:
  await createRNBODevice(audioContext, importedMusicPatcher).then((musicDevice) => {
    const musicDeviceNode = musicDevice.node
    // Music input channel splitter:
    const musicInputChannelSplitter = new ChannelSplitterNode(audioContext, { numberOfOutputs: 2 })

    const microphoneNode = microphone.microphoneNode
    const source = musicAudioSource
    microphoneNode.disconnect()
    source.disconnect()
    const musicOutputChannelSplitter = audioContext.createChannelSplitter(2)
    source.connect(musicInputChannelSplitter)

    // IN
    microphoneNode.connect(musicDeviceNode, 0, 0)
    musicInputChannelSplitter.connect(musicDeviceNode, 0, 1)
    musicInputChannelSplitter.connect(musicDeviceNode, 1, 2)

    //
    // OUT

    musicOutputChannelSplitter.connect(noiseDevice.node, 0, 3) // 1
    musicOutputChannelSplitter.connect(noiseDevice.node, 1, 4) // 1

    musicDeviceNode.connect(musicGainNode, 0, 0)
    musicGainNode.connect(audioContext.destination)

    // console.log('Finished noise')
  })

  /**
   * MUSIC PATCH
*/
  try {
    if (microphone && musicDeviceNode) { audioStore.connectNodes(microphone, musicDeviceNode, 0, 0) }
    if (musicAudioSource && musicInputChannelSplitterNode) { audioStore.connectNodes(musicAudioSource, musicInputChannelSplitterNode, 0, 0) } // 2
    if (musicDeviceNode && musicInputChannelSplitterNode) { audioStore.connectNodes(musicInputChannelSplitterNode, musicDeviceNode, 0, 1) } // 2
    if (musicDeviceNode && musicInputChannelSplitterNode) { audioStore.connectNodes(musicInputChannelSplitterNode, musicDeviceNode, 1, 2) } // 1
  } catch (error) {
    // console.log('failed to connect music patch', error)
  }
  // Gains of Music PATCH
  // const sceneAudioNode = await audioStore.addNode('sceneAudioNode', audioContext.destination)
  audioStore.connectNodes(musicDeviceNode, musicGainNode) // 2

  /**
   * NOISE PATCH
   */
  audioStore.connectNodes(microphone, noiseDeviceNode, 0, 0)

  audioStore.connectNodes(noiseSourceNode, noiseInputChannelSplitterNode, 0, 0) // 2
  audioStore.connectNodes(noiseInputChannelSplitterNode, noiseDeviceNode, 0, 1) // 1
  audioStore.connectNodes(noiseInputChannelSplitterNode, noiseDeviceNode, 1, 2) // 1
  noiseDeviceNode.node.connect(noiseGainNode, 0, 0)

  noiseGainNode.connect(noiseGainNode.context.destination)

  const attenuationFactor = noiseDevice.parametersById.get('attenuation')
  attenuationFactor.value = getAttenuationFactor('Yes' as ANC, 'OverEar' as HeadsetType)

  // Return the gainNodes
  const gainNodes = new Array<GainNode>()
  gainNodes.push(musicGainNode)
  gainNodes.push(noiseGainNode)
  return gainNodes
}
