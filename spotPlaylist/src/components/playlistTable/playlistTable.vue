<template>
    <div class="container mx-auto" v-if="!isSearchSuggestionVisible">
        <h5>Playlist Name</h5><span>{{ numberOfSongs }}</span>
        <table class="table table-hover table-sm ">
            <thead>
                <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Album</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(track, index) in currentlySelectedPlaylist" 
                    :key="track.id"
                    @click="onClickTrack(index)"
                    :class="{ 'table-active': (trackNameWithSelectedIndex(index) === index)} "
                >
                    <td></td>
                    <td class="trackTitle text-truncate">{{ track.name }}</td>
                    <td class="trackMeta text-truncate">{{ track.artists[0].name }}</td>
                    <td class="trackMeta text-truncate">{{ track.album.name }}</td>
                </tr>    
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'playlistTable',
    computed: {
        isSearchSuggestionVisible() {
            return this.$store.getters.isSuggestionDivVisible;
        },
        currentlySelectedPlaylist() {
            if(this.$store.getters.getCurrentPlaylist !== undefined){
                return this.$store.getters.getCurrentPlaylist;
            }
        },
        numberOfSongs() {
            return this.currentlySelectedPlaylist ? `${currentlySelectedPlaylist.length} songs`: '';           
        }
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
        },
        trackNameWithSelectedIndex(index) {
            const currentTrackIndex = this.currentlySelectedPlaylist.findIndex((track) => track.name === this.$store.getters.getCurrentTrack.name);
            return currentTrackIndex;
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
    }

    .trackTitle {
        width: 40%;
    }

</style>
