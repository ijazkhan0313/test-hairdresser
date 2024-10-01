# Architecture 

This project is the frontend implementation of Mindboosts Web Application. It is a Vue 3 Nuxt 3 application running on an node server without serverside rendering.

It consists basically of an login and registration functionality, an onboarding to get relevant information like the input device and personal preferences, an settings menu, four index pages that contain the RNBO player which is needed to use the patented algorithm and the place of all audio output. 

**login & regsistration**
This branches are used to experiment for your own on a specific task but always have a personal backup
Path Styling: `/yourname/task-or-feature-name`

**onboarding**
This branches are used to add team wide tooling features like eslint for better coding experience
Path Styling `/tooling/tool-beeing-applied`

**settings menu**
This branches are used to develop features for the app
Path Styling `/feature/name-of-the-branch`

**index pages**
This branches are used to develop features for the app
Path Styling `/feature/name-of-the-branch`

**RNBO Player**
The RNBO player is a vue component that provides the audio output via the WebAudio-API of the application. It loads two RNBO devices (`music device`, `noise device`), each has its own `patch.export.json` (exported from RNBO-Application). The devices will be loaded as `Audio Nodes` so that we can connect other nodes of the same Audio Context. The `music device` has three inputs: on channel 0 we attach an `MediaStreamSourceNode` which is a direct stream of the users choosed microphone, on channel 1 we attach the left channel of an `ChannelSplitterNode`, on channel 2 we attach the right channel of the `ChannelSplitterNode`. The two output channels of the `music device` are attached to the `noise device` the second RNBO device and to the music-`GainNode`. The `noise device` has five input channels: on channel 0 we attach the same `MediaStreamSourceNode` we use for the `music device` and on channel 1 we attach the left channel of a `ChannelSplitterNode` and on channel 2 we attach the right channel. This `ChannelSplitterNode` gets two input channels from an `BufferAudioSourceNode` which is a buffer containing the masking noise. The masking noise is fetched from the resources provided in the public folder of the node server. Channel 3 of our `noise device` is the left output of the `music device` passed though another `ChannelSplitterNode` and the right output on channel 4. 
The output of our `noise device` is attached to the noise-`GainNode`. The two gain nodes (music-`GainNode` and noise-`GainNode`) are connected with the destination of the AudioContext. The destination is the user selected audio output, you should hear the music and the noise. The GainNodes gain value can be managed via the UI-sliders of the RNBOPlayer component.

**Use of Web Audio API**
The following pages or components make use of Web Audio
* AcusticCheck.vue : For analysing purposes. 
* RNBOPlayer.vue : To create the RNBO Devices and attached them to the right sources and destionations as descriped in RNBOPlayer above
* homeforest.vue : Require access to the Microphone for updating the vue meter that shows an simple dynamic bar chart of the users microphone input
* homemeadow.vue :  : Require access to the Microphone for updating the vue meter...
* hometropics.vue : Require access to the Microphone for updating the vue meter...
* index.vue : Require access to the Microphone for updating the vue meter...
* onboarding.vue : Require access to the Microphone for updating the vue meter...

**Path Management**
In this project, some files are linked to our algorithm. To modify the paths it is possible to change for example the source of the audio files via the .env-file. 

**AudioStore**
One problem we faceing within the application is due to the current achitecture every time we change the page
the old page is unmounted and with it the AudioContext. As the AudioContext need to be unlocked via user interaction it requires always an user input before we can use the WebAudio API. To avoid this behaviour we decided to have a shared audio context, that only needed to be unlocked once. So that we could make use of it in home pages of our soundscapes like e.g. `homeforest.vue` and within the `RNBOPlayer.vue`
We use an pinia store for it. The audiostore provides different functionality for the whole application as long as it is imported correctly. 
It has a shared state... 
* audioContext : The audio context we create within the action `initializeAudioContext()` by the use of Howler.js. Implemeented with Howler.js what comes along with the functionalities for automatically unlock the AudioContext.
* microphone : An object of class `Microphone` defined aswell in audio.ts. Its a wrapper for the microphoneStream an instance of `MediaStream` and microphoneNode an instance of `MediaStreamSourceNode`. The nodes are used to access the microphone, our `microphoneNode` are connected to the RNBO device and the MediaStream is used for updating the vue meter.
* nodes : An array of `AudioNodeItem` objects. `AudioNodeItem` are wrappers to track that type and state of available `AudioNode`-objects in our application. 
* headsetType : The type of the headset the user selected. This is important to calculate the correct attention factor in RNBODevice
* ancDevice : The users selection if it has an headset with active noise cancelling (ANC) functionality. This is used to calculate the correct attention factor
* connectedSoundScape : This is the soundscape selected by the user. 
* playing : This is the shared state if currently the audio is playing or not. This is used by UI elements in homebar, the bottombar and the RNBOPlayer to display the correct play / pause button
* acusticCheckResult : This is the calculated result of the current acustic check result, but is not used so far
* audioFiles : This is a array of AudioBuffers when loaded into the memory. After fetching the audio sources from the node server the audio files are saved in the indexed db. If a buffer is loaded from the indexeddb or direct from the axios response it will be saved in the audioFiles. This makes it easy to create new 'AudioNode'-like objects from preloaded buffers. This is the most important to avoid long loading time and delays.
* loadingBuffers : This is a store internal state representing that currently one or more buffers being fetched or processed

...and shared actions 
* to be done
