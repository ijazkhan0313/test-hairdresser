// stores/devices.ts
import { defineStore } from 'pinia'
import { type Device } from '@rnbo/js'
import { useAudioStore } from './audio'
import { createRNBODevice } from '@/lib/AudioFunctions'
import patcher from '@/assets/patches/1.3.1_versions/export/js/LAF-Controll-Values_Simple_Band1000.rnbopat.export.json'
import noisePatcher from '@/assets/patches/1.3.1_versions/nomusicPatch/export/js/ASM_Vers_4in2out_48kHz_NoMusik.rnbopat.export.json'
import passPatcher from '@/assets/patches/1.3.1_versions/passthrough/passthrough_Stereo.rnbopat.export.json'
import bandPatcher from '@/assets/patches/1.3.1_versions/singleBand/adaptive_masking_controller_NoMusic.rnbopat.export.json'
interface DeviceInfo {
  id: string;
  name: string;
  device: Device | null; // Assuming it could be an AudioWorkletNode for example
  audioNode: AudioNode | null;
}
export const useDevicesStore = defineStore('devices', {
  state: () => ({
    devices: new Map<string, DeviceInfo>()
  }),

  actions: {
    async createDevice (name: string) {
      try {
        // console.log('Creating device')
        const context = useAudioStore().audioContext
        if (context === null) { return }
        const device = await createRNBODevice(context, patcher)
        // console.log('device created', { device })
        this.devices.set(name, { id: name, name, device, audioNode: device.node })
        return device
      } catch (error) {
        // console.error('Failed to create device:', error)
      }
    },
    async createNoiseDevice (name: string) {
      try {
        // console.log('Creating device')
        const context = useAudioStore().audioContext
        if (context === null) { return }
        const device = await createRNBODevice(context, noisePatcher)
        // console.log('device created', { device })
        this.devices.set(name, { id: name, name, device, audioNode: device.node })
        return device
      } catch (error) {
        // console.error('Failed to create device:', error)
      }
    },
    async createPasstroughDevice (name: string) {
      try {
        // console.log('Creating device')
        const context = useAudioStore().audioContext
        if (context === null) { return }
        const device = await createRNBODevice(context, passPatcher)
        // console.log('device created', { device })
        this.devices.set(name, { id: name, name, device, audioNode: device.node })
        return device
      } catch (error) {
        // console.error('Failed to create device:', error)
      }
    },
    async create3BandDevice (name: string) {
      try {
        // console.log('Creating device')
        const context = useAudioStore().audioContext
        if (context === null) { return }
        const device = await createRNBODevice(context, bandPatcher)
        // console.log('device created', { device })
        this.devices.set(name, { id: name, name, device, audioNode: device.node })
        return device
      } catch (error) {
        // console.error('Failed to create device:', error)
      }
    },

    removeDevice (id: string) {
      const deviceInfo = this.devices.get(id)
      if (deviceInfo) {
        if (deviceInfo.audioNode) {
          deviceInfo.audioNode.disconnect()
          deviceInfo.audioNode = null
        }
        this.devices.delete(id)
      }
    },
    getDevice (id: string) {
      const device = this.devices.get(id)
      return device
    },

    getDeviceAudioNode (id: string): AudioNode | null {
      const device = this.devices.get(id)
      return device ? device.audioNode : null
    }
  }
})
