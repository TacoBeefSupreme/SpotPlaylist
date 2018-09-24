<template>
    <div @mousedown="(e) => e.preventDefault()" @mousemove="(e) => e.preventDefault()" 
        @touchmove="(e) => e.preventDefault()" @touchstart="(e) => e.preventDefault()"
    >
        <div class="container-fluid">
            <div class="row bar">
                <leftContent :artistName="setArtistName" :trackName="setTracKName" 
                    :currentTrackArtwork="setArtworkPath"/>

                <centerContent  
                    @shuffleSongs="onShuffle" @nextSong="onNextSong" @prevSong="onPrevSong" @mouseDown="onMouseDown" 
                    @mouseMove="onMouseMovePlaybackBar" @mouseUp="onMouseUpPlaybackBar" 
                    :playing="playing" :repeat="repeat" :shuffle="shuffle" :currentTime="currentTime" 
                    :remainingTime="remainingTime" :duration="duration" :progress="progress"
                />

                <rightContent :volume="volume" :mute="mute" @muteSong="onMute" @mouseDownVolumeBar="onMouseDown" 
                    @mouseMoveVolumeBar="onMouseMoveVolumeBar" @mouseUpVolumeBar="onMouseUpVolumeBar"
                />
            </div>

            <div v-if="currentTrack">
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
    </div>
</template>

<script>
import leftContent from './leftContent';
import centerContent from './centerContent';
import rightContent from './rightContent'
import helpers from '../../assets/js/helpers';

export default {
    name: 'nowPlayingBar',
    components: {
        leftContent,
        centerContent,
        rightContent
    },
    props: {
        currentPlaylist: {
            type: Array,
            default: undefined
        },
        currentTrack: {
            type: Object,
            default: undefined
        },
        artwork: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            audioElement: undefined,
            shuffledPlaylist: [],
            playing: true,
            currentTime: '0:00',
            progress: '0%',
            remainingTime: '',
            volume: '100%',
            mouseDown: false,
            duration: 0,
            currentTrackIndex: 0,
            autoPlay: false,
            repeat: false,
            mute: false,
            shuffle: false
        };
    },
    computed: {
        setAudioSource(){
            const currentTrack = this.$store.getters.getCurrentTrack;
            return (currentTrack)?currentTrack.preview_url:'';
        },
        setArtistName(){
            const currentTrack = this.$store.getters.getCurrentTrack;
            return (currentTrack)?currentTrack.artists[0].name:'';
        },
        setTracKName(){
            const currentTrack = this.$store.getters.getCurrentTrack;
            return (currentTrack)?currentTrack.name:'';
        },
        setArtworkPath(){
            const currentArtwork = this.$store.getters.getCurrentArtwork;
            return (currentArtwork)?currentArtwork:'';
        }
    },
    methods: {
        onMute(){
            this.$store.dispatch('muteSong', !this.$store.getters.isMute);
        },
        onShuffle(){
            //this.shuffle = !this.shuffle;
            this.$store.dispatch('setSuffle', {
                shuffle: !this.$store.getters.isShuffle
            });
        },
        onNextSong(){
            const playlistSize = this.currentPlaylist.length - 1;
            
            if(this.repeat){
                this.audioElement.currentTime = 0;
                this.onPlay();
                return;
            }
            else if(this.currentTrackIndex == playlistSize ) {
                this.currentTrackIndex = 0; // go back to start 
            }
            else{
                this.currentTrackIndex += 1;
            }
        
            const nextTrack = this.shuffle? this.shuffledPlaylist[this.currentTrackIndex] : 
                this.currentPlaylist[this.currentTrackIndex];
            // pause the song first
            this.onPause();
            this.autoPlay = true;
            this.$emit('nextSong', nextTrack);
        },
        onPrevSong(){
            if(this.currentTrackIndex == 0 || this.audioElement.currentTime >= 2){
                this.audioElement.currentTime = 0;
            }else{
                this.currentTrackIndex -= 1;

                const nextTrack = this.currentPlaylist[this.currentTrackIndex];
                this.onPause();
                this.autoPlay = true;
                this.$emit('nextSong', nextTrack);
            }
        },
        setTrack(nextTrack){
            this.currentTrack = nextTrack;
        },
        onMouseDown(val){
            // val will be true since its emitted from the "centerContain" child
            this.mouseDown = val; 
        },
        onMouseMovePlaybackBar(seconds){
            if(this.mouseDown){
                // set time of song depending on posistion of mouse
                this.audioElement.currentTime = seconds;
            }
        },
        onMouseUpPlaybackBar(seconds){
            this.audioElement.currentTime = seconds;
            // this.mouseDown = false;
        },
        onMouseMoveVolumeBar(percentage){
            if(this.mouseDown){
                this.audioElement.volume = percentage;
            }
        },
        onMouseUpVolumeBar(percentage){
            this.audioElement.volume = percentage;
            // this.mouseDown = false;
        },
        handleLoad(){
            //// maybe here figure out the current playlist??
            if(this.audioElement.readyState >= 2 ){
                if(this.autoPlay) {
                    this.onPlay();
                }
                this.duration = this.audioElement.duration;
                this.remainingTime = helpers.formatTime(this.duration);
                if(this.autoPlay) {
                    this.audioElement.play();
                }
            } else {
                throw new Error('Failed to load sound file');
            }
        },
        handleUpdateTimeProgressBar(){
            if(this.audioElement.duration){
                this.currentTime = helpers.formatTime(this.audioElement.currentTime);
                this.remainingTime = helpers.formatTime(this.audioElement.duration - this.audioElement.currentTime);

                const progress = this.audioElement.currentTime / this.audioElement.duration * 100;
                this.progress = `${progress}%`;
            }
        },
        handleUpdateVolumeProgressBar(){
            this.volume = `${this.audioElement.volume * 100}%`;
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
