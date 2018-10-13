<template>
 
    <v-autocomplete 
        v-model="model"
        :items="artists"
        :loading="isLoading"
        :search-input.sync="search"
        hide-no-data hide-selected
        cache-items
        flat
        color="white"
        item-text="artistName"
        item-value="API"
        placeholder="Search for an Artist"
        prepend-icon="library_music"
        return-object
        @input="onInputModelChange"
    >
    </v-autocomplete>


    <!-- <form class="mx-2 my-auto d-inline" @submit="e => e.preventDefault()">
        <div class="input-group">
            <input class="form-control" v-model="searchQuery" 
                type="text" @input="onInputChange"
                placeholder="Search by Artist" 
                @keydown.up="up" @keydown.down="down" 
                @keydown.enter="itemClicked(selectedIndex)"
                spellcheck="false"
            /> 
        </div>
    </form> -->
</template>

<script>
import _ from 'lodash';

export default {
    name: 'searchBar',
    data: function(){
        return {
            model: null,
            search: null
        };
    },
    computed: {
        isLoading(){
            return this.$store.getters.isLoading;
        },
        artists() {
            return this.$store.getters.getArtists.map(artist => {
                const artistName = artist.name;
                return Object.assign({}, artist, {artistName});
            });
        }
    },
    watch: {
        search(val){
            if(val && val !== this.model && !this.isLoading){
                this.searchApiRequest(val);
            }
        }
    },
    methods: {
        // debounce takes the inner function and calls it/runs it every 250 miliseconds, 
        // comment out to see difference
        searchApiRequest: _.debounce(function(val) {    
                this.$store.dispatch('searchArtistId', val);
            }, 
        250), 
        onInputModelChange(){
            if(this.model){
                this.$store.dispatch('setSelectedArtistId', this.model.id);
                this.$store.dispatch('searchArtistTopTrack');
                this.$router.push({path: '/Playlist'});
            }
        }
    }
}
</script>
