<template>
    <div class="input">  
        <div class="form-group">
            <input class="form-control" v-model="searchQuery" 
                type="text" @input="onInputChange"
                placeholder="Search by Artist" 
                 @keydown.up="up" @keydown.down="down"
            /> 
        </div>
            
        <div v-if="visible">
            <ul class="list-group" ref="optionsList">
                <li class="list-group-item list-group-item-action" v-for="(artist,index) in filteredArtists"
                    :key="artist['id']" 
                    v-text="artist['name']"
                    @click="itemClicked(index)"
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
            itemHeight: 36,
            visible: true,
        
        };
    },
    computed: {
        filteredArtists() {
            if(this.searchQuery === '' || this.searchQuery === undefined || this.$store.getters.getArtists === undefined ){
                return;
            }
            return this.$store.getters.getArtists.filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
        }
    },
    methods: {
        // debounce takes the inner function and calls it/runs it every 250 miliseconds, 
        // comment out to see difference
        makeApiRequest: _.debounce(function() {  
            if(this.searchQuery === ''){
                return;
            }    
            this.$store.dispatch('searchArtistId', this.searchQuery);
        }, 250),
        onInputChange(){
            if(this.searchQuery === '' || this.searchQuery === undefined){
                return;
            }
            
            this.makeApiRequest();

            this.visible = true;         
        },
        itemClicked(index){
            const selectedArtistName = this.$store.getters.getArtists[index].name;
            this.visible = false;
            this.selectedIndex = index;
            this.searchQuery = selectedArtistName;
          
            this.$store.dispatch('setSelectedArtistId', this.$store.getters.getArtists[index].id);
            this.$store.dispatch('searchArtistTopTrack');
        },
        up() {
            console.log('called');
            if (this.selectedIndex == 0) {
                return;
            }
            this.selectedIndex -= 1;
            this.scrollToItem();
        },
        down(){
            if(this.selectedIndex >= this.$store.getters.getArtists - 1){
                return;
            }
            this.selectedIndex += 1;
            this.scrollToItem();
        },
        scrollToItem(){
            this.$refs.optionsList.scrollTop = this.selectedIndex * this.itemHeight; 
        }
    }
}
</script>

<style scoped>
    div {
        display: contents;        
    }
    input {
        width: 97%;
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 5px;
    }


    .list-group {
        margin-left: 19px;
        list-style-type: none;
        overflow-y: scroll;
        max-height: 200px;
    }
    
    .list-group-item {
        height: 36px;
        border: none;
    }

    .list-group-item:hover {
        cursor: pointer;
    }

</style>
