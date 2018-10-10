<template>
    <div class="container mx-auto">  
        <div class="form-group">
            <input class="form-control" v-model="searchQuery" 
                type="text" @input="onInputChange"
                placeholder="Search by Artist" 
                 @keydown.up="up" @keydown.down="down" 
                 @keydown.enter="itemClicked(selectedIndex)"
                 spellcheck="false"
            /> 
        </div>
            
        <div v-if="visible">
            <ul class="list-group" ref="optionsList">
                <li class="list-group-item" v-for="(artist,index) in filteredArtists"
                    :key="artist['id']" @mouseover="selectedIndex = index"
                    :class="{ 'active': (selectedIndex == index)} "
                    v-text="artist['name']"
                    @click="itemClicked(selectedIndex)"
                ></li>
            </ul>
        </div>
      
    </div>

</template>

<script>
import _ from 'lodash';

export default {
    name: 'searchBar',
    data: function(){
        return {
            searchQuery: '',
            selectedIndex: 0,
            itemHeight: 36
        };
    },
    computed: {
        filteredArtists() {
            if(this.searchQuery === '' || this.searchQuery === undefined || this.$store.getters.getArtists === undefined){
                this.$store.dispatch('setSuggestionsDivVisiblilty', false);  
                return;
            }
            const filteredArtistList =  this.$store.getters.getArtists.filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
            this.$store.dispatch('setFilteredArist', filteredArtistList);
            return filteredArtistList;
        },
        visible() {
            return this.$store.getters.isSuggestionDivVisible;
        }
    },
    methods: {
        // debounce takes the inner function and calls it/runs it every 250 miliseconds, 
        // comment out to see difference
        searchApiRequest: _.debounce(function() {  
            if(this.searchQuery === ''){
                return;
            }    
            this.$store.dispatch('searchArtistId', this.searchQuery);
        }, 250),
        onInputChange(){
            if(this.searchQuery === '' || this.searchQuery === undefined){
                return;
            }
            
            this.searchApiRequest();

            this.$store.dispatch('setSuggestionsDivVisiblilty', true);        
        },
        itemClicked(index){
            const selectedArtistName = this.$store.getters.getArtists[index].name;
            
            this.$store.dispatch('setSuggestionsDivVisiblilty', false);   
            this.selectedIndex = 0;
            this.searchQuery = selectedArtistName;
          
            this.$store.dispatch('setSelectedArtistId', this.$store.getters.getArtists[index].id);
            this.$store.dispatch('searchArtistTopTrack');
        },
        up() {
            if (this.selectedIndex == 0 || this.selectedIndex === null) {
                return;
            }
            this.selectedIndex -= 1;
            this.scrollToItem();
        },
        down(){
            if(this.selectedIndex >= this.$store.getters.getArtists.length - 1 || !this.visible){
                return;
            }
            this.selectedIndex += 1;
            this.scrollToItem();
        },
        scrollToItem(){
            if(this.visible){
                this.$refs.optionsList.scrollTop = this.selectedIndex * this.itemHeight; 
            }
        }
    }
}
</script>

<style scoped>
    .container {
        width: 50%;
        margin-top: 20px;
    }

    .list-group {
        margin-top: 3px; 
        margin-left: 19px;
        list-style-type: none;
        overflow-y: scroll;
        max-height: 200px;
    }
    
    .list-group-item {
        height: 36px;
        border: none;
        cursor: pointer;
    }

    .list-group-item:not(.active):hover {
        color: rgb(70, 70, 77);
        font-weight: 500;
    }

    .active {
        background-color: rgb(238, 238, 238);
        color: rgb(70, 70, 77);
        font-weight: 500;
    }

</style>
