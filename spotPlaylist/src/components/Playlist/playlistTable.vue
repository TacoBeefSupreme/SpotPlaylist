<template>
    <div>
        <div v-if="loading">
            <Loader :width="60" :height="60" :borderSize="8" />
        </div>
        <div class="container mx-auto" v-else-if="!isSearchSuggestionVisible && isCurrentSelectedPlaylist && !loading">
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
    </div>
</template>

<script>
import Loader from '../Shared/Loader';

export default {
    name: 'playlistTable',
    components: {
        Loader
    },
    data: function(){
        return {
            trackCliked: false
        };
    },
    computed: {
        isSearchSuggestionVisible() {
            return this.$store.getters.isSuggestionDivVisible;
        },
        currentlySelectedPlaylist() {
            const currentPlayingPlaylist = this.$store.getters.getCurrentPlaylist;
            return currentPlayingPlaylist !== undefined ? this.$store.getters.getCurrentPlaylist : null;
        },
        isCurrentSelectedPlaylist(){
            return this.$store.getters.getCurrentPlaylist ? true: false;
        },
        numberOfSongs() {
            return this.currentlySelectedPlaylist ? `${this.currentlySelectedPlaylist.length} songs`: '';           
        },
        loading(){
            return this.$store.getters.isLoading;
        },
    },
    methods: {
        onClickTrack(index) {
            const track = {
                currentTrack: this.currentlySelectedPlaylist[index],
                currentArtwork: this.currentlySelectedPlaylist[index].album.images[0].url,
                currentTrackIndex: index
            };
            this.$store.dispatch('setAutoPlay', true);
            this.$store.dispatch('setCurrentTrack', track);
            this.trackCliked = !this.trackCliked;
        },
        trackNameWithSelectedIndex() {
            if(this.$store.getters.getCurrentTrack){
                const currentTrackIndex = this.currentlySelectedPlaylist.findIndex((track) => track.name === this.$store.getters.getCurrentTrack.name);
                return currentTrackIndex;
            }
        }
    }
}
</script>

<style scoped>
    .container {
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
        /* float: left; */
        background-size: cover;
    }
</style>
