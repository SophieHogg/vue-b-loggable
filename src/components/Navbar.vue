<script lang="ts" setup>
import { computed } from "vue";
import { useUsers } from "../stores/users";
import { useModal } from "./../composables/Modal";

const modal = useModal();
const usersStore = useUsers();
</script>
<template>
    <div class="navbar">
        <div class="navbar-end">
            <div class="buttons" v-if="usersStore.currentUserId">
                <RouterLink to="/posts/new" class="button">
                    New Post
                </RouterLink>
                <button class="button" @click="usersStore.logout()">
                    Log Out
                </button>
            </div>
            <div class="buttons" v-else>
                <button class="button" @click="modal.showModal('signUp')">
                    Sign Up
                </button>
                <button class="button" @click="modal.showModal('signIn')">
                    Sign In
                </button>
            </div>
        </div>
    </div>
    <Teleport to="#modal">
        <component :is="modal.component.value" />
    </Teleport>
</template>
