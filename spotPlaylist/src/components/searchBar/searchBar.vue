<template>
    <div>
        <form>
            <div class="col-md-6">
                <form @submit="(e) => e.preventDefault()">
                    <input v-model="searchQuery" @change="makeApiRequest" 
                        class="form-control mr-sm-2" type="text" 
                        placeholder="Artist Name" aria-label="Search"
                    />
                </form>
            </div>
        </form>
    </div>

</template>

<script>
import api from '../../api';

export default {
    name: 'searchBar',
    data() {
        return{
            searchQuery: ''
        };
    },
    methods: {
        async makeApiRequest(){
            const topTracksResponse = await api.fetchTopTracks(this.searchQuery);
            this.$store.dispatch('setPlaylist', topTracksResponse.data);
            
            /// move this table componet, set it first track in table component later on
            // maybe table component should have its own playlist and current track state?? 
            this.$store.dispatch('setCurrentTrack', {
                currentTrack: this.$store.getters.getCurrentPlaylist[0],
                currentArtwork:  this.$store.getters.getCurrentPlaylist[0].album.images[0].url,
                currentTrackIndex: 0
            });      
        }
    }
}
</script>

<style scoped>
   div {
       margin: 20px;
       text-align: center;
   }
</style>
