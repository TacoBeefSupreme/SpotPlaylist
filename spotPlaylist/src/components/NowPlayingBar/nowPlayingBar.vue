<template>
    
    <div class="container-fluid" @mousedown="(e) => e.preventDefault()" @mousemove="(e) => e.preventDefault()" 
        @touchmove="(e) => e.preventDefault()" @touchstart="(e) => e.preventDefault()">
        <div class="row bar">
            <TrackMetaData />
            <AudioControl />
            <VolumeControl />
        </div>

        <div v-if="this.$store.getters.getCurrentTrack">
            <audio ref="audioElement" :src="setAudioSource" preload="auto"
                @loadeddata="handleLoad" @timeupdate="handleUpdateTimeProgressBar"  
                @volumechange="handleUpdateVolumeProgressBar" @ended="onNextSong"
                style="display:none">
            </audio>
        </div>
        
        <div v-else>
            <audio ref="audioElement"></audio>
        </div>
    </div>
 
</template>

<script>
import TrackMetaData from './trackMetaData';
import AudioControl from './audioControl';
import VolumeControl from './volumeControl'
import helpers from '../../assets/js/helpers';

export default {
    name: 'nowPlayingBar',
    components: {
        TrackMetaData,
        AudioControl,
        VolumeControl
    },
    computed: {
        setAudioSource(){
            const currentTrack = this.$store.getters.getCurrentTrack;
            return (currentTrack)?currentTrack.preview_url:'';
        }
    },
    methods: {
        onNextSong(){
            this.$store.dispatch('setNextTrack');
        },
        handleLoad(){
            //// maybe here figure out the current playlist??
            if(this.$store.getters.getAudioElement.readyState >= 2 ){
                if(this.$store.getters.isAutoPlay) {
                    this.$store.dispatch('playPauseSong', {
                        playing: false,
                        playSong: true
                    });
                }

                this.$store.dispatch('setDuration', this.$store.getters.getAudioElement.duration);
                this.$store.dispatch('setRemainingTime', helpers.formatTime(this.$store.getters.getDuration));
               
            } else {
                throw new Error('Failed to load sound file');
            }
        },
        handleUpdateTimeProgressBar(){
            if(this.$store.getters.getAudioElement.duration){
    
                this.$store.dispatch('setCurrentTime', 
                    helpers.formatTime(this.$store.getters.getAudioElement.currentTime)
                );
                this.$store.dispatch('setRemainingTime', 
                    helpers.formatTime(
                        this.$store.getters.getAudioElement.duration - 
                        this.$store.getters.getAudioElement.currentTime
                    )
                );

                const progress = this.$store.getters.getAudioElement.currentTime / this.$store.getters.getAudioElement.duration * 100;
                this.$store.dispatch('setProgress', `${progress}%`);
            }
        },
        handleUpdateVolumeProgressBar(){
            this.$store.dispatch('setVolume', `${this.$store.getters.getAudioElement.volume * 100}%`);
        },
        resetMouseDown(){
            this.$store.dispatch('setMouseDown', false);
        }
    },
    mounted(){
        this.$store.dispatch('setAudioElement', this.$refs.audioElement );
        this.$el.addEventListener('mouseup', this.resetMouseDown);
    },
    beforeDestroy(){
        this.$el.removeEventListener('mouseup', this.resetMouseDown);
    }
}
</script>

<style scoped>
    .container-fluid {
        height: 96px;
        width: 100%;
        background-color: rgb(246,246,246);
        bottom: 0;
        position: fixed;
    }

    .bar {
        display: flex;
        padding: 16px;
        box-sizing: border-box;
    }
</style>
