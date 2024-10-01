import { Howl } from 'howler'

function Player (playlist, location) {
  this.playlist = playlist
  this.location = location
  this.index = 0
}
Player.prototype = {
  showMediaInformation (scenery) {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: scenery,
        artist: 'Mindboost',
        artwork: [
          { src: '/images/scenery/' + scenery + '.jpg', sizes: '96x96', type: 'image/jpeg' }
        ]
      })
    }
  },
  createNewHowl (data) {
    // console.log(`/${location}/${data.file}.m4a`)
    //  const sound = new Howl({ src: [src], html5: true, onend: () => { sound.unload(); }, });
    const myHowl = new Howl({
      src: [`/${this.location}/${data.file}.m4a`, `/${this.location}}/${data.file}.ogg`],
      html5: true,
      loop: true,
      autoplay: false,
      mute: false,
      onplay: () => {
        data.node = null
        const sound = data.howl
        const audioContext = Howler.ctx
        const htmlElement = sound._sounds[0]._node
        this.showMediaInformation(data.file.charAt(0).toUpperCase())
        data.node = audioContext.createMediaElementSource(htmlElement)
      },
      onload: () => {
      },
      onend: () => {
        // Changed to arrow function
        data.sound = null
        data.node = null
        this.skip('next')
      },
      onpause: () => {
        // Stop the wave animation.
      },
      onstop: () => {
        data.sound = null
        data.node = null
      }
    })
    return myHowl
  },
  initializeAudioNode () {
    const sound = this.playlist[index]
    return Howler.ctx.createMediaElementSource(sound._sounds[0]._node)
  },
  play () {
    // Get the Howl we want to manipulate.
    const sound = this.playlist[index].howl
    const title = this.playlist[index].title

    // Puase the sound.
    if (sound.state() === 'loaded') {
      sound.play()
    }
    this.addMediaNavigationHandling(title)
  },
  initializeHowl (index = 0) {
    const data = this.playlist[index]
    this.index = index
    let sound
    // If we already loaded this track, use the current one.
    if (data.howl) {
      sound = data.howl
    } else {
      sound = data.howl = this.createNewHowl(data)
      sound.node = data.node = initializeAudioNode()
    }
    if (!(data.node instanceof MediaElementAudioSourceNode)) {
      data.node = null
      data.node = Howler.ctx.createMediaElementSource(sound._sounds[0]._node)
    }

    // else {
    /// / console.log('scene not loaded yet', this.playlist[index].title)
    //   sound.on('load', () => {
    // // console.log('load', this.playlist[0].title)
    //     try {
    //       data.howl.play()
    //     } catch (e) {
    //   // console.log(e)
    //     }
    //   })
    // }

    return sound
  },
  pause () {
    // Get the Howl we want to manipulate.
    const sound = this.playlist[self.index].howl

    // Puase the sound.
    sound.pause()
    removeMediaNavigationHandling()

    // Show the play button.
    playBtn.style.display = 'block'
    pauseBtn.style.display = 'none'
  },
  // Similarly, refactor other methods to use arrow functions where needed

  /**
     * Skip to the next or previous track.
     * @param  {String} direction 'next' or 'prev'.
     */
  skip (direction) {
    let index = 0
    if (direction === 'prev') {
      index = this.index - 1
      if (index < 0) {
        index = this.playlist.length - 1
      }
    } else {
      index = this.index + 1
      if (index >= this.playlist.length) {
        index = 0
      }
    }

    this.skipTo(index)
  },
  skipTo (index) {
    // Stop the current track.
    if (this.playlist[this.index].howl) {
      this.playlist[this.index].howl.stop()
      this.playlist[this.index].node.disconnect()
      this.playlist[this.index].node = null
    }
    // Play the new track.
    this.initializeHowl(index)
    // sound.play()
  },
  setBarWidth (val) {
    // Update the display on the slider.
    const barWidth = (val * 90) / 100
    barFull.style.width = `${barWidth * 100}%`
    sliderBtn.style.left = `${window.innerWidth * barWidth + window.innerWidth * 0.05 - 25}px`
  },
  setVolume (val) {
    // Update the global volume (affecting all Howls).
    Howler.volume(val)
    this.setBarWidth()
  },
  seek (per) {
    // Get the Howl we want to manipulate.
    const sound = this.playlist[this.index].howl

    // Convert the percent into a seek position.
    if (sound.playing()) {
      sound.seek(sound.duration() * per)
    }
  },
  step () {
    // Use arrow function to preserve `this` context for `requestAnimationFrame`
    const stepUpdate = () => {
      // Get the Howl we want to manipulate.
      const sound = this.playlist[this.index].howl

      // Determine our current seek position.
      const seek = sound.seek() || 0
      timer.innerHTML = this.formatTime(Math.round(seek))
      progress.style.width = `${(seek / sound.duration()) * 100 || 0}%`

      // If the sound is still playing, continue stepping.
      if (sound.playing()) {
        requestAnimationFrame(stepUpdate)
      }
    }

    requestAnimationFrame(stepUpdate)
  },
  togglePlaylist () {
    const display = (playlist.style.display === 'block') ? 'none' : 'block'

    setTimeout(() => {
      playlist.style.display = display
    }, (display === 'block') ? 0 : 500)
    playlist.className = (display === 'block') ? 'fadein' : 'fadeout'
  },

  toggleVolume () {
    const display = (volumeDivRef.style.display === 'block') ? 'none' : 'block'

    setTimeout(() => {
      volumeDivRef.style.display = display
    }, (display === 'block') ? 0 : 500)
    volumeDivRef.className = (display === 'block') ? 'fadein' : 'fadeout'
  },

  formatTime (secs) {
    const minutes = Math.floor(secs / 60) || 0
    const seconds = (secs - minutes * 60) || 0

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  },

  /**
   * shows media information like a preview in the navigator of your smartphone
   * @param {String} scenery
   */

  // Navigation and event handling
  removeMediaNavigationHandling () {
    if ('mediaSession' in navigator) {
      // Remove Play action handler
      navigator.mediaSession.setActionHandler('play', null)

      // Remove Pause action handler
      navigator.mediaSession.setActionHandler('pause', null)

      // Remove Previous track action handler
      navigator.mediaSession.setActionHandler('previoustrack', null)

      // Remove Next track action handler
      navigator.mediaSession.setActionHandler('nexttrack', null)
    }
  },
  addMediaNavigationHandling () {
    if ('mediaSession' in navigator) {
      this.showMediaInformation()
      // Play action
      navigator.mediaSession.setActionHandler('play', (_e) => {
      // Your play action here
        this.play()
      })

      // Pause action
      navigator.mediaSession.setActionHandler('pause', (_e) => {
        // console.log('Eventhandler pause of navigator: ' + e)
        // Your pause action here
        this.pause()
      })

      // Previous track action
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        this.skipTo(playlist.index - 1)
        // console.log('Previous track button pressed')
      })

      // Next track action
      navigator.mediaSession.setActionHandler('nexttrack', () => {
      // Your next track action here
        this.skipTo(playlist.index - 1)
        // console.log('Next track button pressed')
      })
    }
  }

}

export default Player
