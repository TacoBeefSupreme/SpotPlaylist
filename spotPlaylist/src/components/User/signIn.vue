<template>
    <v-container fluid>
        <v-layout align-center justify-center row fill-height >
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Sign In</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field prepend-icon="person" name="email" label="Email" type="email" color="primary"></v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" color="primary"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-layout align-center justify-center>
                            <v-btn color="primary">Submit</v-btn>
                        </v-layout>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'signIn'
}
</script>

<style scoped>
   
</style>


