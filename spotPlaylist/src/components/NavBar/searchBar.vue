<template>
    <form class="mx-2 my-auto d-inline" @submit="e => e.preventDefault()">
        <div class="input-group">
            <input class="form-control" v-model="searchQuery" 
                type="text" @input="onInputChange"
                placeholder="Search by Artist" 
                @keydown.up="up" @keydown.down="down" 
                @keydown.enter="itemClicked(selectedIndex)"
                spellcheck="false"
            /> 
        </div>
    </form>
</template>

<script>
import _ from 'lodash';

export default {
    name: 'searchBar',
    props: {
        selectedIndex: Number
    },
    data: function(){
        return {
            searchQuery: '',
            itemHeight: 36
        };
    },
    computed: {
        visible() {
            console.log('searchBar: ');
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
        filterArtists() {
            const filteredArtistList =  this.$store.getters.getArtists.filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
            this.$store.dispatch('setFilteredArist', filteredArtistList);
            return filteredArtistList;
        },
        onInputChange(){
            if(this.searchQuery === '' || this.searchQuery === undefined){
                this.$store.dispatch('setSuggestionsDivVisiblilty', false);  
                return;
            }
            
            this.searchApiRequest();
            this.filterArtists();

            this.$store.dispatch('setSuggestionsDivVisiblilty', true);        
        },
        itemClicked(index){
            const selectedArtistName = this.$store.getters.getArtists[index].name;
            
            this.$store.dispatch('setSuggestionsDivVisiblilty', false);   
            //this.selectedIndex = 0;
            this.$emit('setSelectedIndex', 0);
            this.searchQuery = selectedArtistName;
          
            this.$store.dispatch('setSelectedArtistId', this.$store.getters.getArtists[index].id);
            this.$store.dispatch('searchArtistTopTrack');
            this.$router.push({path: '/Playlist'});
        },
        up() {
            if (this.selectedIndex === 0) {
                this.$emit('setSelectedIndex', 0);
                this.scrollToItem();
                
            }else{
                //this.selectedIndex -= 1;
                this.$emit('setSelectedIndex', this.selectedIndex-1);
                this.scrollToItem();
            }
        },
        down(){
            if(this.selectedIndex >= this.$store.getters.getArtists.length - 1 || !this.visible){
                return;
            }
            //this.selectedIndex += 1;
            this.$emit('setSelectedIndex', this.selectedIndex+1);
            this.scrollToItem();
        },
        scrollToItem(){
            if(this.visible){
                console.log(this.selectedIndex);
                this.$emit('scrollTop', this.selectedIndex * this.itemHeight);
                //this.$refs.optionsList.scrollTop = this.selectedIndex * this.itemHeight; 
            }
        }
    }
}
</script>

<style scoped>
    form {
        width: 500px;
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
