<template>
    <v-container>
        <v-layout row>
            <v-flex sm4>
                <v-btn fab dark small color="white">
                    <v-icon @click="onMute" v-if="!this.$store.getters.isMute" color="primary" >volume_up</v-icon>
                    <v-icon @click="onMute" v-else color="orange darken-1" >volume_off</v-icon>   
                </v-btn>
            </v-flex>
            <v-flex sm8>
                <div 
                    ref="volumeProgressBar" 
                    @mousedown="onMouseDown" 
                    @mousemove="onMouseMove" 
                    @mouseup="onMouseUp"
                    style="cursor: pointer"
                    >
                    <v-progress-linear 
                        v-model="widthPercentage" 
                        color="primary"
                    ></v-progress-linear>
                </div>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
import helpers from '../../assets/js/helpers';

export default {
    name: 'volumeControl',
    props: {
        volume: String,
        mute: Boolean
    },
    data() {
        return{
            baseProgressStyles: {
                backgroundColor: "rgb(71,71,71)",
                height: "4px",
                width: "0%",
                borderRadius: "2px"
            },
            volumeProgressBar: undefined
        };
    },
    computed: {
        widthPercentage(){
            return this.$store.getters.getVolume;
        }
    },
    methods: {
        onMute(){
            this.$store.dispatch('muteSong', !this.$store.getters.isMute);
        },
        onMouseDown(){
            this.$store.dispatch('setMouseDown', true);
        },
        onMouseMove(e){
            if(this.$store.getters.isMouseDown){
                const percentage = helpers.volumePercentageOffset(e, this.volumeProgressBar);
                if(percentage >= 0 && percentage <= 1 ){
                    this.$store.dispatch('setAudioElementVolumePercentage', percentage);
                }
            }
        },
        onMouseUp(e){
            const percentage = helpers.volumePercentageOffset(e, this.volumeProgressBar);
            if(percentage >= 0 && percentage <= 1 ){
                this.$store.dispatch('setAudioElementVolumePercentage', percentage);
            }
        }
    },
    mounted(){
        this.volumeProgressBar = this.$refs.volumeProgressBar;
    }
}
</script>

<style scoped>
    .flex.sm8 {
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 50px;
    }


    .contain {
        width: 100%;
    }

    .volumeBar {
        width: 180px;
        position: absolute;
        right: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-top: 29px;
        
    }
    img {
        width: 20px;
        height: 20px;
    }

    .volume {
        float: left;
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
    .progressBar {
        width: 100%;
        height: 4px;
        display: inline-flex;
        cursor: pointer;
        background-color: rgb(199,199,199);
        border-radius: 2px;
        margin-top: 3px;
        margin-right: 3px;
    } 
</style>
