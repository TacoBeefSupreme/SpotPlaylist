<template>
    <div class="col-6 contentContainer">
        <div class="content playerControls">
            <div class="buttons">
                <button type="button" class="controlButton" title="Shuffle button" @click="onShuffle" >
                    <img v-if="shuffle" src="../../assets/images/icons/shuffle-active.png" alt="Shuffle">
                    <img v-else src="../../assets/images/icons/shuffle.png" alt="Shuffle">
                </button>

                <button class="controlButton" title="Previous button" @click="onPrev">
                    <img src="../../assets/images/icons/previous.png" alt="Previous">
                </button>

                <button v-if="playing" class="controlButton play" title="Play button" @click="onPlay">
                    <img src="../../assets/images/icons/play.png" alt="Play">
                </button>

                <button v-else class="controlButton pause" title="Pause button" @click="onPause" >
                    <img src="../../assets/images/icons/pause.png" alt="Pause">
                </button>

                <button class="controlButton" title="Next button" @click="onNext" >
                    <img src="../../assets/images/icons/next.png" alt="Next">
                </button>

                <button class="controlButton" title="Repeat button" @click="onRepeat" >
                    <img v-if="repeat" src="../../assets/images/icons/repeat-active.png" alt="Repeat">
                    <img v-else src="../../assets/images/icons/repeat.png" alt="Repeat">
                </button>
        
            </div>

            <div class="playbackBar">
                <span class="progressTime">{{ currentTime }}</span>
                <div class="progressBar" ref="progressBar" @mousedown="onMouseDown" @mouseup="onMouseUp" @mousemove="onMouseMove">
                    <div v-bind:style="[baseProgressStyles, widthPercentage]" ></div>
                </div>
                <span class="progressTime">{{ remainingTime }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import helpers from '../../assets/js/helpers';

export default {
    name: 'centerContent',
    props: {
        playing: Boolean,
        currentTime: String,
        remainingTime: String,
        progress: {
            type: String,
            default: '0%'
        },
        duration: Number,
        repeat: Boolean,
        shuffle: Boolean
    },
    data() {
        return {
            baseProgressStyles: {
                backgroundColor: "rgb(71,71,71)",
                height: '5px',
                width: '0%',
                borderRadius: '2px',
            },
            progressBar: undefined
        };
    },
    computed: {
        widthPercentage(){
            return {
                width: this.progress
            }
        }
    },
    methods: {
        onPlay(){
            if(this.$store.getters.getCurrentTrack){
                // takes care of case when user clicks play button before song is loaded from server
                this.$store.dispatch('playPauseSong', {
                    playing: false,
                    playSong: true
                });
            }
        },
        onPause(){
            this.$store.dispatch('playPauseSong', {
                playing: true,
                playSong: false
            });
        },
        onRepeat(){
            this.$store.dispatch('repeatSong', !this.$store.getters.isRepeat);
        },

        onShuffle(){
            this.$emit('shuffleSongs');
        },
        onMouseDown(){
            this.$emit('mouseDown', true);
        },
        onMouseMove(e){
            const seconds = helpers.timeFromOffset(e, this.progressBar, this.duration);
            this.$emit('mouseMove', seconds);
        },
        onMouseUp(e){
            const seconds = helpers.timeFromOffset(e, this.progressBar, this.duration);
            this.$emit('mouseUp', seconds);
        }
    },
    mounted(){
        this.progressBar = this.$refs.progressBar;
    }
}
</script>

<style scoped>
    .contentContainer{
        width: 100%;
        max-width: 700px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .content {
        width: 100%;
        height: 55px;
    }
    .buttons {
        margin: 0 auto;
        display: table;
    }
    .controlButton {
        background-color: transparent;
        border: none;
        vertical-align: middle;
        outline: 0;
    }
    .controlButton:focus {
        border: solid 0.5px rgb(189, 216, 247);
        border-radius: 2px;
    }
    .controlButton img {
        width: 20px;
        height: 20px;
    }
    .controlButton.play img,
    .controlButton.pause img {
        width: 32px;
        height: 32px;
    }

    .controlButton:hover {
        cursor: pointer;
    }
    
    .playbackBar {
        display: flex;
    }

    .progressTime {
        color: rgb(123,123,123);
        font-size: 11px;
        text-align: center;
        margin-top: 2px;
        margin-left: 4px;
        margin-right: 4px;
    }
    .progressBar {
        width: 100%;
        height: 5px;
        display: inline-flex;
        cursor: pointer;
        background-color: rgb(199,199,199);
        border-radius: 2px;
        margin-top: 6px;
        margin-right: 3px;
    }
       
</style>
