<template>
    <div class="col-3">
        <div class="row">
            <div class="content float-left">
                <img class="artwork" v-bind:src="setArtworkPath"/>        
            </div>

            <div class="float-right">
                <div class="trackName">
                    <span>{{ setTracKName }}</span>
                </div>
        
                <div class="artistName">
                    <span>{{ setArtistName }}</span>
                </div>
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
        /* float: left; */
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
