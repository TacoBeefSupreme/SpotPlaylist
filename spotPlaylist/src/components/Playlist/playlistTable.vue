<template>
    <v-container grid-list-md text-xs-center my-5 pt-2 >
        <v-layout row>
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
                        <v-list-tile :key="track.id" avatar ripple @click="onClickTrack(index)" class="cursor: pointer">
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


    <!-- <div>
        <div v-if="loading">
            <Loader :width="60" :height="60" :borderSize="8" />
        </div>
        <div v-else-if=" isCurrentSelectedPlaylist && !loading">
            <h5>Playlist Name</h5><span>{{ numberOfSongs }}</span>
            <table class="table table-hover table-sm">
                <thead>
                    <tr>
                        <th>
                        </th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Album</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(track, index) in currentlySelectedPlaylist" 
                        :key="track.id"
                        @click="onClickTrack(index)"
                        :class="{ 'table-active': (trackNameWithSelectedIndex() === index )} "
                    >
                        <td> <img class="artwork" :src="track.album.images[0].url"/>   </td>
                        <td class="trackTitle text-truncate ">{{ track.name }}</td>
                        <td class="trackMeta text-truncate">{{ track.artists[0].name }}</td>
                        <td class="trackMeta text-truncate">{{ track.album.name }}</td>
                    </tr>    
                </tbody>
            </table>
        </div>
    </div> -->
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
               
                trackName = currentlySelectedTrack.name;
            }
            console.log(trackName);
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
                this.$store.dispatch('setCurrentTrack', track);
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
    /* .container {
        width: 75%;
        margin-top: 40px;
    }

    tbody:hover {
        cursor: pointer;
    }

    th {
        font-weight: 600;
    }

    td {
        font-size: 14px;
        vertical-align: middle;
    }

    .trackTitle {
        width: 40%;
    }

    .artwork {
        height: 55px;
        max-width: 55px;
        margin-right: 15px;
        background-size: cover;
    } */
</style>
