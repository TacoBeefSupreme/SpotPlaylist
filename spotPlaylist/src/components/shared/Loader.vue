<template>
    <div id="spinner" :style="getLoadingSpinnerCss" ></div>
</template>

<script>
export default {
    name: 'Loader',
    props: {
        width: Number,
        height: Number,
        borderSize: Number
    },
    computed: {
        getWidth(){
            return this.width + "px";
        },
        getHeight(){
            return this.height + "px";
        },
        getBorderSize(){
            return this.borderSize + "px";
        },
        getLoadingSpinnerCss(){
            return {
                height: this.getHeight,
                width: this.getWidth,
                border: `${this.getBorderSize} solid #f3f3f3`,
                borderTop: `${this.getBorderSize} solid #3498db`
            }
        }
    }
}
</script>

<style scoped>
    #spinner {
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 1;
        margin: -75px 0 0 -75px;
        border: 8px solid #f3f3f3;
        border-radius: 50%;
        border-top: 8px solid #3498db;
        width: 60px;
        height: 60px;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
    }

    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
