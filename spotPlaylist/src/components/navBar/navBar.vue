<template>
    <div class="container">
        <!-- <nav class="navbar navbar-light" style="background-color: #e3f3fd;">
             
        </nav>  -->
        <searchBar />
    </div>

</template>

<script>
import searchBar from './searchBar';

export default {
    name: 'navBar',
    components: {
        searchBar
    },
    methods: {
    //   onSelected(option) {
    //       this.selected = option.item;
    //   },
    //   onInputChange(text) {
    //     if (text === '' || text === undefined) {
    //       return;
    //     }
        
    //     /* Full control over filtering. Maybe fetch from API?! Up to you!!! */
    //     const filteredData = this.options[0].data.filter(item => {
    //       return item.toLowerCase().indexOf(text.toLowerCase()) > -1;
    //     }).slice(0, this.limit);
        
    //     this.filteredOptions = [{
    //       data: filteredData
    //     }];
    //   }
    }
}
</script>

<style scoped>



</style>
