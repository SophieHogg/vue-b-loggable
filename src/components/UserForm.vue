<script lang="ts" setup>
import { ref, computed } from "vue";
import { NewUser } from "../users";
import { validate, minLength, required } from "../validation";
import FormInput from "./FormInput.vue";

defineProps<{
    error?: string;
}>();
const emit = defineEmits<{
    (event: "submit", payload: NewUser): void;
}>();
const username = ref("");
const usernameStatus = computed(() => {
    return validate(username.value, [required, minLength(5)]);
});

const password = ref("");
const passwordStatus = computed(() => {
    return validate(password.value, [required, minLength(9)]);
});

const isInvalid = computed(() => {
    return !usernameStatus.value.valid || !passwordStatus.value.valid;
});

async function handleSubmit() {
    if (isInvalid.value) {
        return;
    }
    const newUser: NewUser = {
        username: username.value,
        password: password.value,
    };
    try {
        emit("submit", newUser);
    } catch (e) {}
}
</script>

<template>
    <form class="form" @submit.prevent="handleSubmit">
        <FormInput
            type="text"
            name="Username"
            v-model="username"
            :status="usernameStatus"
        />
        <FormInput
            type="password"
            name="Password"
            v-model="password"
            :status="passwordStatus"
        />
        <div class="is-danger help mb-2" v-if="error">{{ error }}</div>
        <button class="button is-primary" :disabled="isInvalid">Submit</button>
    </form>
</template>

<style scoped>
.form {
    background-color: white;
    padding: 30px;
    margin-top: 40px;
    border-radius: 10px;
}
</style>
