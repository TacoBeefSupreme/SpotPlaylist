<template>
    <v-container grid-list-md text-xs-center my-5 pt-2 >
        <v-layout v-if="loading" align-center justify-center row fill-height >
            <v-progress-circular
                :size="70"
                :width="7"
                 color="cyan"
                indeterminate
            ></v-progress-circular>
        </v-layout>
        <v-layout v-else row>
            <v-flex sm5 v-if="$vuetify.breakpoint.smAndUp">
                <v-card v-if="currentlySelectedTrack">
                    <v-container >
                        <v-layout>
                            <v-flex xs7>
                                <v-img 
                                    :src="currentlySelectedTrack.album.images[0].url"
                                    contain
                                >
                                </v-img>
                            </v-flex>
                            <v-flex xs5>
                                <v-card-title primary-title>
                                    <div>
                                        <div class="headline">Playlist Name!</div>
                                    </div>
                                </v-card-title>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
                <v-container>
                    <v-layout>
                        <v-flex sm6 text-xs-center>
                            <div @click="onPlay">
                                <v-btn large>Play </v-btn>
                            </div>
                        </v-flex>
                        <v-flex sm6 text-xs-center>
                            <div @click="onShuffle">
                                <v-btn large>Shuffle</v-btn>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-container>   
            </v-flex>
            <!-- <v-flex xs12 sm6 offset-sm3 align-center justify-center fill-height> -->
            <v-flex xs12 sm6 offset-sm1 align-center justify-center fill-height>
                <v-list three-line>
                    <v-subheader> Playlist Name: {{ numberOfSongs }}</v-subheader>
                    <template v-for="(track, index) in currentlySelectedPlaylist" >
                        <v-list-tile :key="track.id" avatar ripple @click="onClickTrack(index)" class="listItem">
                            <v-list-tile>
                                <img 
                                    :src="track.album.images[0].url"
                                    max-width="50"
                                    height="50"
                                >
                            </v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-title v-html="track.name"></v-list-tile-title>
                                 <v-list-tile-sub-title v-html="track.album.name"></v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-icon v-if="track.name === currentlySelectedTrackName" color="blue">
                                    library_music
                                </v-icon>
                            </v-list-tile-action>

                        </v-list-tile>
                    </template>
                </v-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Loader from '../Shared/Loader';

export default {
    name: 'playlistTable',
    components: {
        Loader
    },
    computed: {
        currentlySelectedPlaylist() {
            const currentPlayingPlaylist = this.$store.getters.getCurrentPlaylist;
            return currentPlayingPlaylist !== undefined ? this.$store.getters.getCurrentPlaylist : null;
        },
        currentlySelectedTrack(){
            return this.$store.getters.getCurrentTrack ? this.$store.getters.getCurrentTrack: null;
        },
        currentlySelectedTrackName(){
            let trackName = null;
            if(this.currentlySelectedTrack){
               
                trackName = this.currentlySelectedTrack.name;
            }
            return trackName;
        },
        numberOfSongs() {
            return this.currentlySelectedPlaylist ? `${this.currentlySelectedPlaylist.length} songs`: '';           
        },
        loading(){
            return this.$store.getters.isLoading;
        },
    },
    methods: {
        // onClickTrack(index) {
        //     const track = {
        //         currentTrack: this.currentlySelectedPlaylist[index],
        //         currentArtwork: this.currentlySelectedPlaylist[index].album.images[0].url,
        //         currentTrackIndex: index
        //     };
        //     this.$store.dispatch('setCurrentTrack', track);
        //     this.$store.dispatch('setAutoPlay', true);
        //     this.trackCliked = !this.trackCliked;
        // },
        onClickTrack(index) {
            const track = {
                currentTrack: this.currentlySelectedPlaylist[index],
                currentArtwork: this.currentlySelectedPlaylist[index].album.images[0].url,
                currentTrackIndex: index
            };
            this.$store.dispatch('setCurrentTrack', track);
            this.$store.dispatch('setAutoPlay', true);
            this.selectedIndex = index
        },
        onPlay(){
            if(this.currentlySelectedPlaylist){
                this.onClickTrack(0);
            }
        },
        onShuffle(){
            //// FIX ///////
            if(this.currentlySelectedPlaylist){
                let randomTrackIndex = Math.floor((Math.random() * this.currentlySelectedPlaylist.length));
                const track = {
                    currentTrack: this.currentlySelectedPlaylist[randomTrackIndex],
                    currentArtwork: this.currentlySelectedPlaylist[randomTrackIndex].album.images[0].url,
                    currentTrackIndex: randomTrackIndex
                };
                //this.$store.dispatch('setCurrentTrack', track);
                this.$store.dispatch('setSuffle', {
                    shuffle: !this.$store.getters.isShuffle,
                    loadingNewPlaylist: false
                });
                this.$store.dispatch('setAutoPlay', true);
            }
        }
    }
}
</script>

<style scoped>
    .listItem {
        cursor: pointer;
    }
    .listItem:hover {
        background-color: rgb(228,231,234);
    }

</style>
