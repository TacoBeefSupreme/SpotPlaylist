<template>
    <div class="col">
        <div class="content">
            <img class="artwork" v-bind:src="setArtworkPath"/>
            <!-- <img class="artwork" src="https://i.scdn.co/image/c8496887deb3062348d7b3c219e6815e3c2c67de"/> -->
            
        </div>

        <div class="trackData">
            <div class="trackName">
                <span>{{ setTracKName }}</span>
            </div>
    
            <div class="artistName">
                <span>{{ setArtistName }}</span>
            </div>
        </div>
    </div>
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
    .artwork {
        height: 55px;
        max-width: 55px;
        margin-right: 15px;
        float: left;
        background-size: cover;
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
        overflow: hidden;
        max-width: 300px;
        max-height: 20px;
    }

    .artistName span {
        display: inline-flex;
        font-size: 12px;
        color: rgb(123,123,123);
        font-size: 9px;
        max-width: 50px;
        max-height: 27px;
    }
</style>
