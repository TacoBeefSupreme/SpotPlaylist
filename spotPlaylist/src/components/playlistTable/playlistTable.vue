<template>
    <div class="container mx-auto" v-if="!isSearchSuggestionVisible">
        <h5>Playlist Name</h5><span>10 songs</span>
        <table class="table table-hover table-sm ">
            <thead>
                <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Album</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'playlistTable',
    computed: {
        isSearchSuggestionVisible() {
            return this.$store.getters.isSuggestionDivVisible;
        }
    }
}
</script>

<style scoped>
    .container {
        width: 75%;
        margin-top: 40px;
    }

    tbody:hover {
        cursor: pointer;
    }

    th {
        font-weight: 600;
    }

</style>
