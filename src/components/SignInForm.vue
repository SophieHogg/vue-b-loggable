<script lang="ts" setup>
import { ref } from "vue";
import { useModal } from "../composables/Modal";
import { useUsers } from "../stores/users";
import { NewUser } from "../users";
import UserForm from "./UserForm.vue";

const usersStore = useUsers();
const modal = useModal();
const error = ref("");

async function handleSignIn(newUser: NewUser) {
    const body = JSON.stringify({
        ...newUser,
    });
    const res = await window.fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body,
    });

    if ([401, 404].includes(res.status)) {
        error.value = "Username or password was incorrect.";
    } else {
        usersStore.authenticate();
        modal.hideModal();
    }
    // return this.authenticate();
    // success: aauth, hide modal
    // fail? 401 or 404
}
</script>
<template>
    <UserForm @submit="handleSignIn" :error="error" />
</template>
