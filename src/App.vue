<script lang="ts" setup>
import { ref, computed } from "vue";
import Navbar from "./components/Navbar.vue";
import { useModal } from "./composables/Modal";

const modal = useModal();
const modalStyle = computed(() => {
    return {
        display: modal.show.value ? "block" : "none",
    };
});
</script>

<template>
    <div class="modal" style="color: white" :style="modalStyle">
        <div class="modal-background">
            <div class="modal-content">
                <div id="modal"></div>
            </div>
        </div>
        <button class="modal-close is-large" @click="modal.hideModal"></button>
    </div>
    <div class="section">
        <h1 class="title is-2 is-primary has-text-centered">B-Loggable</h1>
        <div class="container">
            <Navbar />
            <RouterView />
        </div>
    </div>
</template>

<style>
@import "highlight.js/styles/atom-one-dark.css";
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
ul {
    list-style: revert !important;
    list-style-position: inside !important;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-size: revert !important;
}

pre {
    margin: 10px 0 !important;
}

p {
    margin: 10px 0 !important;
}
</style>
