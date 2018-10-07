<template>
    <div class="input">  
        <form @submit="(e) => e.preventDefault()"> 
            <!-- <input class="form-control border border-right-0" v-model="searchQuery" 
                @change="makeApiRequest" type="text" 
                placeholder="Search by Artist name" 
            />  -->
            <div class="form-group">
                <input class="form-control" v-model="searchQuery" 
                    type="text" @input="onInputChange"
                    placeholder="Search by Artist name" 
                /> 
            </div>
             
            <div v-if="visible">
                <ul class="list-group">
                    <li class="list-group-item list-group-item-action" v-for="(artist,index) in filteredArtists"
                        :key="artist['id']" 
                        v-text="artist['name']"
                        @click="itemClicked(index)"
                    ></li>
                </ul>
            </div>
        </form>
    </div>

</template>

<script>
import _ from 'lodash';

export default {
    name: 'searchBar',
    data: function(){
        return {
            searchQuery: '',
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
            // this.visible = !this.visible;
            if(this.searchQuery === '' || this.searchQuery === undefined){
                return;
            }
            
            this.makeApiRequest();

            this.visible = true;         
        },
        itemClicked(index){
            const selectedArtistName = this.$store.getters.getArtists[index].name;
            this.visible = false;
            this.searchQuery = selectedArtistName;
          
            this.$store.dispatch('setSelectedArtistId', this.$store.getters.getArtists[index].id);
            this.$store.dispatch('searchArtistTopTrack');
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
