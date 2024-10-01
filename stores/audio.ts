// stores/counter.js
import { defineStore, type _ActionsTree, type StoreDefinition, type StateTree } from 'pinia'
import { type AudioNodeItem } from './interfaces/AudioNodeItem'
import { useUserStore } from './user'
import { connectAudioNodes } from '~/lib/AudioFunctions'
import type Player from '~/components/Player/Player'

export const useAudioStore: StoreDefinition = defineStore<'audio', StateTree, _ActionsTree>('audio', {
  state: () => {
    return {
      audioContext: new AudioContext() as AudioContext,
      nodes: new Map() as Map<string, AudioNodeItem>,
      playing: false,
      scene: 'Lagoon',
      acusticCheckResult: 0,
      scenePlayer: null as Player | null,
      noisePlayer: null as Player | null
    }
  },

  actions: {
    async checkAndResumeAudioContext () {
      if (this.audioContext.state === 'suspended') {
        try {
          await this.audioContext.resume()
          console.log('AudioContext resumed successfully.')
        } catch (error) {
          console.error('Failed to resume AudioContext:', error)
          this.resetAudioContext()
        }
      }
      if (this.audioContext.state === 'closed') {
        try {
          this.resetAudioContext()
          console.log('AudioContext resumed successfully.')
        } catch (error) {
          console.error('Failed to resume AudioContext:', error)
          this.resetAudioContext()
        }
      }
    },
    setPlayers ({ scenePlayer, noisePlayer }:any) {
      this.scenePlayer = scenePlayer
      this.noisePlayer = noisePlayer
    },
    //
    // Audio Context Actions
    //
    isPlaying (): boolean {
      return this.playing
    },

    pauseContext (): void {
      const audioContext = this.getAudioContext()
      if (audioContext) {
        audioContext.playbackRate = 0
        audioContext.suspend()
      }
    },
    async getAudioContext () : Promise<AudioContext> {
      // console.log('getAudioContext')
      if (Howler.ctx) {
      // console.log('Audio Context is there...')
        if (Howler.ctx.state === 'suspended') { Howler.ctx.resume() }
        if (Howler.ctx.state === 'closed') { return new AudioContext() }
        return Howler.ctx
      } else {
        return await this.initializeAudioContext()
      }
    },
    getContext () : AudioContext {
      // console.log('getContext')

      if (this.audioContext) { return this.audioContext } else {
        this.audioContext = new AudioContext()
        return this.audioContext
      }
    },
    async initializeAudioContext (): Promise<AudioContext> {
      return await this.audioContext
    },
    resetAudioContext () {
      this.audioContext.close().then(() => {
        this.audioContext = new AudioContext()
        // Reconnect any necessary nodes or reinitialize your audio setup
        console.log('AudioContext has been reset and recreated.')
      })
    },
    resetAudioContextHowler () {
      if (Howler.ctx) {
      // console.log('AudioContext has been reset')
        Howler.unload()
      } else if (this.audioContext instanceof AudioContext && this.audioContext.state !== 'closed') {
        try {
          Howler.stop()
          Howler.unload()
          this.audioContext = null
          this.setPlaying(false)
        // console.log('AudioContext has been reset')
        } catch (_error) {
          // console.error('Error closing AudioContext:', _error)
        }
      }
    },

    setPlaying (stateChange: boolean): void {
      this.playing = stateChange
    },
    //
    // Working with Web Audio Nodes
    //
    removeNodeByType (name: string): void {
      if (this.nodes && this.nodes.has(name)) {
        this.nodes.delete(name)
      } else {
        // console.warn('Node not found. Unable to remove node')
      }
    },
    getNodeByType (name: string): AudioNodeItem | null {
      if (this.nodes instanceof Map) {
        return this.nodes.get(name) as AudioNodeItem
      }

      return null
    },
    getMicrophoneNode (): AudioNodeItem | null {
      return this.nodes.get('microphone')
    },
    async getBufferSourceNode (name: string): Promise<AudioNodeItem | null> {
      const node:AudioNodeItem = this.nodes.has(name)
      if (node) {
      // console.log('Node gibts schon')
        return node
      } else {
        await this.createBufferSource(name)
        const createdNode = this.getNodeByType(name)
        // console.log('created node ', { createdNode })
        return createdNode
      }
    },
    async createMediaStreamNodeAsync (steam: MediaStream): Promise<MediaStreamAudioSourceNode> {
      const audioCtx: AudioContext = await this.getAudioContext()
      // console.log({ audioCtx })
      const streamNode = audioCtx.createMediaStreamSource(steam)
      this.addNode('microphone', streamNode)
      return streamNode
    },

    createMediaStreamNode (steam: MediaStream): MediaStreamAudioSourceNode {
      // console.log({ audioCtx })
      const streamNode = this.audioContext.createMediaStreamSource(steam)
      this.addNode('microphone', streamNode)
      return streamNode
    },
    async createBufferSource (name:string): Promise<AudioNodeItem> {
      const audioCtx = await this.getAudioContext()
      const abn = audioCtx.createBufferSource()
      const result = this.addNode(name, abn)
      return result
    },
    disconnectAllNodes (): void {
      if (this.nodes.length > 0) {
        this.nodes.forEach((n:AudioNodeItem) => n.node?.disconnect())
        this.nodes = {} as Map<string, AudioNodeItem>
      }
    },
    startNode (node:AudioNodeItem) {
      if (node.node instanceof AudioBufferSourceNode) {
        node.node?.start(0)
        // console.log('started Node' + node.type, { nod1 })
      }
    },
    addNode (type: string, node: AudioNode): AudioNodeItem {
      this.nodes.set(type, { type, node, started: false })
      // console.log('adding node', { values: [...this.nodes.values()] })
      return { type, node, started: false } as AudioNodeItem
    },
    connectNodes (nodeFrom: AudioNodeItem, nodeTo: AudioNodeItem, channelOutput?: number, channelInput?:number): void {
      if (nodeFrom && nodeTo && !channelInput && !channelOutput) {
        connectAudioNodes(nodeFrom.node as AudioNode, nodeTo.node as AudioNode)
      }
      if (nodeFrom && nodeTo && channelOutput && !channelInput) {
        connectAudioNodes(nodeFrom.node as AudioNode, nodeTo.node as AudioNode, channelOutput)
      }
      if (nodeFrom && nodeTo && channelOutput && channelInput) {
        connectAudioNodes(nodeFrom.node as AudioNode, nodeTo.node as AudioNode, channelOutput, channelInput)
      }
      // console.log('nodeTo tpye: ' + nodeTo.type)
      if (nodeTo.type && nodeFrom.nextNodeName) { nodeFrom.nextNodeName = nodeTo.type }
      nodeTo.previousNodeName = nodeFrom.type
    },
    startAllSources () : void {
      const app = useNuxtApp()
      // @ts-ignore
      const user = useUserStore(app.$pinia)
      const userObj = user.user as any
      // console.log({ userObj })
      this.nodes.forEach((node: AudioNodeItem, key: string) => {
        const userSoundscape = userObj.settings.soundscape === 'x' ? 'tropics' : userObj.settings.soundscape || 'meadow'
        if (key === userSoundscape || key === 'noise') {
          if (node.node instanceof AudioBufferSourceNode && !node.started) {
            this.startBufferSourceNode(node.node)
          }
        }
      })
    },
    startBufferSourceNode (node: AudioBufferSourceNode) {
    // console.log('startBufferSourceNode ')

      this.nodes.forEach((value: AudioNodeItem) => {
        if (value.node === node) {
          const c = value.node as AudioBufferSourceNode
          // console.log('AudioContext ' + audioContext.state)
          c.start(0)
          value.started = true
        }
      })
    },
    replaceMusicNode (oldNode: AudioNodeItem, newNode: AudioNodeItem):AudioNodeItem {
      if (!this.nodes.has(oldNode.type) || !this.nodes.has(newNode.type)) {
        // this.$logger.warn('AudioNodes not present in nodes Map')
      }
      if (oldNode.node ! instanceof AudioBufferSourceNode || oldNode.node ! instanceof AudioBufferSourceNode) {
        // createLogger().warn('AudioNodes not AudioBufferSourceNodes')
      }

      const nextNode = oldNode.nextNodeName ? this.nodes.get(oldNode.nextNodeName) : null
      if (!nextNode || (nextNode && nextNode.node ! instanceof ChannelSplitterNode)) {
        // createLogger().warn('AudioNodes not ChannelSplitterNodes')
      } else {
        oldNode.node?.disconnect()
        oldNode.started = false
        oldNode = {} as AudioNodeItem
        if (newNode && newNode.node) {
          if (nextNode.type) { newNode.nextNodeName = nextNode.type as string }
          newNode.node.connect(nextNode?.node as AudioNode)
          return newNode
        }
      }
      return newNode
    }
  }
})
