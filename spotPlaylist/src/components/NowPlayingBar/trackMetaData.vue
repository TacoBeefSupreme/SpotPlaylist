<template>
    <v-container>
        <v-layout align-center justify-center row fill-height>
            <v-flex sm12>
                <v-img 
                    :src="setArtworkPath"
                    contain
                    width="55"
                    height="55"
                    class="float: left"
                    pa-1
                >
                </v-img>
                <v-spacer></v-spacer>
                <div class="text-truncate">
                    <div class="text-truncate">
                        <span>{{ setTracKName }}</span>
                    </div>
                    <div class="text-truncate">
                        <span>{{ setArtistName }}</span>
                    </div>
                </div>
            </v-flex>
                
                   
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'trackMetaData',
    computed: {
        setArtistName(){
            const currentTrack = this.$store.getters.getCurrentTrack;
            return (currentTrack)?currentTrack.artists[0].name:'';
        },
        setTracKName(){
            const currentTrack = this.$store.getters.getCurrentTrack;
            return (currentTrack)?currentTrack.name:'';
        },
        setArtworkPath(){
            const currentArtwork = this.$store.getters.getCurrentArtwork;
            return (currentArtwork)?currentArtwork:'';
        }
    }
}
</script>

<style scoped>
    .text-truncate{
        margin-left: 13px; 
    }

    .container {
        padding-bottom: 0;
        padding-top: 15px;
    }

</style>
