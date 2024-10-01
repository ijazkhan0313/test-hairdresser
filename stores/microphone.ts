import { defineStore, type _ActionsTree, type StateTree, type StoreDefinition } from 'pinia'
import type { Microphone } from './interfaces/Microphone'
import { useAudioStore } from './audio'

export const useMicStore:StoreDefinition = defineStore<'microphone', StateTree, _ActionsTree>('microphone', {
  state: () => ({
    microphone: null as Microphone | null
  }),
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async getMicrophone (): Promise<Microphone> {
      // If already defined, return the existing microphone to avoid re-initialization
      if (this.microphone && this.microphone.microphoneNode && this.microphone.microphoneStream) {
        return this.microphone as Microphone
      }

      // Get or refresh the MediaStream
      const mediaStream = await this.getMediaStream()

      // Create a MediaStreamAudioSourceNode from the MediaStream
      const audioCtx = await useAudioStore().getAudioContext() // Assuming useAudioStore() has a defined audioContext
      const microphoneNode = audioCtx.createMediaStreamSource(mediaStream)
      useAudioStore().addNode('microphone', microphoneNode) // Add the microphones
      // console.log('created Microphone ready for get back ', { microphoneNode, audioCtx })
      // Update the store's state
      this.microphone = {
        microphoneNode,
        microphoneStream: mediaStream
      }

      return this.microphone
    },
    async getMediaStream (): Promise<MediaStream> {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        },
        video: false
      })

      // Add event listener for track removal
      mediaStream.addEventListener('removetrack', () => {
        this.detachMicrophoneSource()
      })

      return mediaStream
    },

    detachMicrophoneSource () {
      // Stop all tracks on the microphone stream
      this.microphone?.microphoneStream.getTracks().forEach((track:MediaStreamTrack) => track.stop())
      // Optionally clear the microphone state
      this.microphone = null
      // Additional cleanup as needed...
    }
  }
})
