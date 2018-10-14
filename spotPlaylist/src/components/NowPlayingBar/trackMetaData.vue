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

    <!-- <div class="col-3">
        <div class="row">
            <div class="content float-left">
                <img class="artwork" v-bind:src="setArtworkPath"/>        
            </div>

            <div class="trackData">
                <div class="trackName text-truncate">
                    <span class="d-inline-block text-truncate">{{ setTracKName }}</span>
                </div>
        
                <div class="artistName">
                    <span class="d-inline-block text-truncate">{{ setArtistName }}</span>
                </div>
            </div>
        </div>
    </div> -->
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
    .artwork {
        height: 55px;
        max-width: 55px;
        margin-right: 15px;
        /* float: left; */
        background-size: cover;
    }
    .float-right {
        overflow: hidden;
    }
    .trackData {
        display: table;
        overflow: hidden;
        border-bottom: 50px;
    }

    .trackName span{
        display: inline-flex;
        /* margin: 2px 0; */
        width: 100%;
        font-size: 12px;
        /* overflow: hidden; */
        max-width: 150px;
        max-height: 20px;
    }

    .artistName span {
        display: inline-flex;
        font-size: 12px;
        color: rgb(123,123,123);
        font-size: 9px;
        max-width: 80px;
        max-height: 27px;
    }
</style>
