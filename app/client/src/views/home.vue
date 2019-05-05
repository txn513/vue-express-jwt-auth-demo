<template>
    <mu-container>
        <mu-card style="width: 100%; margin: 0 auto;" :raised=true>
            <mu-card-header title="Myron Avatar" sub-title="sub title">
                <mu-avatar slot="avatar">
                <img src="">
                </mu-avatar>
            </mu-card-header>
            <!-- <mu-card-media title="Image Title" sub-title="Image Sub Title">
                <img src="">
            </mu-card-media> -->
            <mu-card-title title="Content Title" sub-title="Content Title"></mu-card-title>
            <mu-card-text>
                
            </mu-card-text>
            <!-- <mu-card-actions>
                <mu-button flat>more</mu-button>
            </mu-card-actions> -->
        </mu-card>
    </mu-container>
</template>
<script>
import { getIndex } from '../api'
export default {
    data(){
        return {

        }
    },
    methods: {
        getIndex(){
            // console.log(getIndex)
            getIndex().then(res => {
                console.log(res)
            })
        }
    },
    created(){
        this.getIndex()
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding-top: 50px;
}
.mu-card-header {
    background: #3f51b5;
    .mu-card-title {
        color: #fff;
    }
    .mu-card-sub-title {
        color: #fff;
    }
}
</style>
