<template>
    <div class="flex item-center mt-2">
        <div style="width:20px" v-for="rating in state.ratings">
            <img alt="Star" :src="rating" />
        </div>
        <!-- {{props.rating}} -->
    </div>
</template>
<script setup lang="ts">
    import { reactive } from "vue";
    const props = defineProps < {
        rating: number,
    } > ()
    const state = reactive({ ratings: [] });
    function getRatingArray() {
        let rating = props.rating;
        for (let i = 1; i < 6; i++) {
            if (rating >= 1) {
                state.ratings.push('/src/assets/images/star-icon.svg');
            } else if (rating <= 0) {
                state.ratings.push('/src/assets/images/star-blank-icon.svg');
            } else {
                state.ratings.push('/src/assets/images/star-half-icon.svg');
            }
            rating = rating - 1;
        }
    }
    getRatingArray();
</script>