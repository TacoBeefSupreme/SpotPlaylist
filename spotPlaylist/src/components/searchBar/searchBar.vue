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

export default {
    name: 'searchBar',
    data: function(){
        return {
            searchQuery: ''
        };
    },
    methods: {
        async makeApiRequest(){
        // look into SEARCH STATE "searchArtistTopTrack" action for the comment below 

        /// move this to table componet, set it first track in table component later on
        // maybe table component should have its own playlist and current track state??
            
            await this.$store.dispatch('searchArtistId', this.searchQuery);
            this.$store.dispatch('searchArtistTopTrack');
                
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
