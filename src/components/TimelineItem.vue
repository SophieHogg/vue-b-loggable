<script lang="ts" setup>
import { TimelinePost } from "../posts";
defineProps<{ post: TimelinePost }>();
</script>

<template>
    <a
        class="panel-block is-flex is-flex-direction-column is-align-items-flex-start"
    >
        <a>{{ post.title }}</a>
        <div>{{ post.created.toFormat("d MMM yyyy") }}</div>
    </a>
</template>
