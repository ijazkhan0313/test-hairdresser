<template>
  <div>
    <!-- Slot for passing any audio element -->
    <canvas id="audioVisualizer" width="640" height="100" />
  </div>
</template>

<script>

function drawVisualization (analyser, canvasCtx) {
  const bufferLength = analyser.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)

  const WIDTH = canvasCtx.canvas.width
  const HEIGHT = canvasCtx.canvas.height

  function draw () {
    requestAnimationFrame(draw)

    analyser.getByteTimeDomainData(dataArray)

    canvasCtx.fillStyle = 'rgb(200, 200, 200)'
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

    canvasCtx.lineWidth = 2
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)'

    canvasCtx.beginPath()

    const sliceWidth = WIDTH * 1.0 / bufferLength
    let x = 0

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0
      const y = v * HEIGHT / 2

      if (i === 0) {
        canvasCtx.moveTo(x, y)
      } else {
        canvasCtx.lineTo(x, y)
      }

      x += sliceWidth
    }

    canvasCtx.lineTo(WIDTH, HEIGHT / 2)
    canvasCtx.stroke()
  }

  draw()
}

export default {
  name: 'AudioVisualization',
  props: {
    analyser: {
      type: Object,
      required: true
    }
  },

  setup (props) {
    onMounted(() => {
      const audioCanvas = document.getElementById('audioVisualizer').getContext('2d')
      drawVisualization(props.analyser, audioCanvas)
    })

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyDown.bind(this))
    })

    return {
      audioCanvas: null
    }
  }
}
</script>

  <style scoped>
  /* Style adjustments if needed */
    /* Styles the track */
  input[type="range"]::-webkit-slider-runnable-track {
    background: #e9c046; /* yellow track */
      height: 8px;
      border-radius: 5px;
    }

  input[type="range"]::-moz-range-track {
      background: #e9c046; /* yellow track */
      height: 8px;
      border-radius: 5px;
  }

  input[type="range"]::-ms-track {
      background: #e9c046; /* yellow track */
      border-color: transparent;
      color: transparent;
      height: 8px;
  }

  </style>
^
