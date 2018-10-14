<template>
    <v-container>
        <v-layout row ml-5>
            <v-flex sm2>
                <v-btn fab dark small color="white">
                    <v-icon @click="onShuffle" v-if="!this.$store.getters.isShuffle" color="primary" >shuffle</v-icon>
                    <v-icon @click="onShuffle" v-else color="orange darken-1" >shuffle</v-icon>   
                </v-btn>
            </v-flex>
            <v-flex sm2>
                <v-btn fab dark small color="white">
                    <v-icon dark @click="onPrev" color="primary">skip_previous</v-icon>
                </v-btn>
            </v-flex>
            <v-flex sm2 v-if="this.$store.getters.isPlaying">
                <v-btn fab dark small color="white">
                    <v-icon dark @click="onPlay" color="primary">play_circle_outline</v-icon>
                </v-btn>
            </v-flex>
            <v-flex sm2 v-else>
                <v-btn fab dark small color="white">
                    <v-icon dark @click="onPause" color="primary">pause_circle_outline</v-icon>
                </v-btn>
            </v-flex>
            <v-flex sm2>
                <v-btn fab dark small color="white">
                    <v-icon dark @click="onNext" color="primary">skip_next</v-icon>
                </v-btn>
            </v-flex>
            <v-flex sm2>
                <v-btn fab dark small color="white">
                    <v-icon dark @click="onRepeat" v-if="!this.$store.getters.isRepeat" color="primary">repeat</v-icon>
                    <v-icon dark @click="onRepeat" v-else color="orange darken-1">repeat_one</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
             <span class="time">{{ this.$store.getters.getCurrentTime }}</span>
            <v-flex sm10>
                <div 
                    ref="progressBar" 
                    @mousedown="onMouseDown" 
                    @mouseup="onMouseUp" 
                    @mousemove="onMouseMove"
                    style="cursor: pointer"
                >
                    <v-progress-linear 
                        v-model="widthPercentage" 
                        color="primary"
                    ></v-progress-linear>
                </div>
            </v-flex>
            <span class="time">{{ this.$store.getters.getRemainingTime }}</span>
        </v-layout>
    </v-container>
</template>

<script>
import helpers from '../../assets/js/helpers';

export default {
    name: 'audioControl',
    props: {
        progress: {
            type: String,
            default: '0%'
        }
    },
    data() {
        return {
            baseProgressStyles: {
                backgroundColor: "rgb(71,71,71)",
                height: '5px',
                width: '0%',
                borderRadius: '2px',
            },
            progressBar: undefined,
            valueDeterminate: 50
        };
    },
    computed: {
        widthPercentage(){
            return this.$store.getters.getProgress;
        }
    },
    methods: {
        onPlay(){
            this.$store.dispatch('playPauseSong', {
                playing: false,
                playSong: true
            });
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
            if(this.$store.getters.getCurrentPlaylist){
                this.$store.dispatch('setSuffle', {
                    shuffle: !this.$store.getters.isShuffle,
                    loadingNewPlaylist: false
                });
            }
        },
        onNext(){
            if(this.$store.getters.getCurrentPlaylist){
                this.$store.dispatch('setNextTrack');
            }
        },
        onPrev(){
            this.$store.dispatch('setPrevTrack');
        },
        onMouseDown(){
            this.$store.dispatch('setMouseDown', true);
        },
        onMouseMove(e){
            if(this.$store.getters.isMouseDown){
                // set time of song depending on posistion of mouse
                const seconds = helpers.timeFromOffset(e, this.progressBar, this.$store.getters.getDuration);
                this.$store.dispatch('setAudioElementCurrentTime', seconds);
            }
        },
        onMouseUp(e){
            const seconds = helpers.timeFromOffset(e, this.progressBar, this.$store.getters.getDuration);
            this.$store.dispatch('setAudioElementCurrentTime', seconds);
        }
    },
    mounted(){
        this.progressBar = this.$refs.progressBar;
    }
}
</script>

<style scoped>

    .container {
        padding-top: 0;
        padding-bottom: 0;
    }

    .time {
        margin-top: 7px;
        margin-right: 5px;
        margin-left: 5px;
    }
       
</style>
