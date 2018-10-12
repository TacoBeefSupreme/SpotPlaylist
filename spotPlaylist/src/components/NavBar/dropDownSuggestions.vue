<template>
    <div>
        <div v-if="visible" class="container">
            <ul class="list-group" ref="optionsList">
                <li class="list-group-item" v-for="(artist,index) in filteredArtists"
                    :key="artist['id']" @mouseover="onMouseOver(index)"
                    :class="{ 'active': (selectedIndex == index)} "
                    v-text="artist['name']"
                    @click="onItemClicked(selectedIndex)"
                ></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'dropDown',
    props: {
        selectedIndex: Number
    },
    computed: {
        filteredArtists(){
            return this.$store.getters.getArtists;
        },
        visible() {
            return this.$store.getters.isSuggestionDivVisible;
        }
    },
    methods: {
        onMouseOver(index){
            this.$emit('setSelectedIndex', index);
        },
        onItemClicked(index){
            const selectedArtistName = this.$store.getters.getArtists[index].name;
            
            this.$store.dispatch('setSuggestionsDivVisiblilty', false);   
            this.$emit('setSelectedIndex', 0);
            
            this.$store.dispatch('setSelectedArtistId', this.$store.getters.getArtists[index].id);
            this.$store.dispatch('searchArtistTopTrack');
            this.$router.push({path: '/Playlist'});
        }
    },
    beforeUpdate() {
        this.$emit('setDropDownSugDivRef', this.$refs.optionsList);
    },
}
</script>

<style scoped>
    .container {
        margin-top: 5px;
        /* margin-left: 107px; */
    }

    .list-group {
        margin-top: 3px;
        margin-right: 172px;
        margin-left: 31px;
        list-style-type: none;
        overflow-y: scroll;
        max-height: 200px;
        width: 605px;
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

