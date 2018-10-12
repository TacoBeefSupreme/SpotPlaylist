<template>
    <div >
        <!-- navbar-expand-md  -->
        <nav class="navbar navbar-light navbar-fixed-top" style="background-color: #e3f3fd;"> 
            <div class="container-fluid">
                <div class="navbar-header">
                    <router-link to="/" class="navbar-brand">SpotPlaylist</router-link>
                </div>
                
                <div class="d-flex justify-content-center searchBarContainer">
                    <searchBar @scrollTop="onScrollTop" :selectedIndex="selectedIndex" 
                        @setSelectedIndex="onSetSelectedIndex" 
                />
                </div>

                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-outline-primary authButtons" @click="signIn">Sign In</button>
                    <button type="button" class="btn btn-outline-primary authButtons" @click="signUp">Sign Up</button>
                    <button type="button" class="btn btn-outline-primary authButtons" @click="logout">Logout</button>
                </div>
            </div>
        </nav> 
        <div class="d-flex justify-content-center">
            <dropDown :visible="visible" @setDropDownSugDivRef="onSetDropDownSugDivRef" 
                :selectedIndex="selectedIndex"  @setSelectedIndex="onSetSelectedIndex"
            />
        </div>
    </div>

</template>

<script>
import searchBar from './searchBar';
import dropDown from './dropDownSuggestions';

export default {
    name: 'navBar',
    components: {
        searchBar,
        dropDown
    },
    data(){
        return {
            visible: false,
            dropDownSugDivRef: '',
            selectedIndex: 0
        }
    },
    methods: {
        signIn() {
            this.$router.push({path: '/signin'});
        },
        signUp() {
            this.$router.push({path: '/signup'});
        },
        logout() {
            this.$router.push({path: '/'});
        },
        onScrollTop(value){
            if(this.dropDownSugDivRef){
                this.dropDownSugDivRef.scrollTop = value;
            }
        },
        onSetDropDownSugDivRef(ref){
            this.dropDownSugDivRef = ref;
        },
        onSetSelectedIndex(index){
            this.selectedIndex = index;
        }
    }
}
</script>

<style scoped>
    .searchBarContainer {
        display: contents;
    }
    .authButtons{
        margin-left: 10px
    }


</style>
