<script setup lang="ts">
import { TimelinePost } from "../posts";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { marked } from "marked";
import highlightjs from "highlight.js";
import debounce from "lodash/debounce";
import { usePosts } from "../stores/posts";

const props = defineProps<{
    post: TimelinePost;
}>();
const title = ref(props.post.title);
const content = ref(props.post.markdown);
const html = ref("");
const contentEditable = ref<HTMLDivElement>();
const posts = usePosts();
const router = useRouter();

function parseHtml(markdown: string) {
    marked.parse(
        markdown,
        {
            gfm: true,
            breaks: true,
            highlight: (code) => {
                return highlightjs.highlightAuto(code).value;
            },
        },
        (err, parseResult) => {
            html.value = parseResult;
        }
    );
}

watch(
    content,
    debounce((newContent) => {
        parseHtml(newContent);
    }, 250), //stop the html from re-rendering with every single key press - waits 250ms
    { immediate: true }
);

onMounted(() => {
    if (!contentEditable.value) {
        throw Error("ContentEditable DOM node was not found");
    }
    contentEditable.value.innerText = content.value;
});

function handleInput() {
    if (!contentEditable.value) {
        throw Error("ContentEditable DOM node was not found");
    }
    content.value = contentEditable.value.innerText;
}

async function handleClick() {
    const newPost: TimelinePost = {
        ...props.post,
        title: title.value,
        markdown: content.value,
        html: html.value,
    };
    await posts.createPost(newPost);
    router.push("/");
}
</script>

<template>
    <div class="columns">
        <div class="column">
            <div class="field">
                <div class="label">Post Title</div>
                <input
                    type="text"
                    class="input"
                    placeholder="Title"
                    v-model="title"
                />
            </div>
        </div>
    </div>
    <div class="columns">
        <div class="column entry-col">
            <div
                contenteditable
                ref="contentEditable"
                @input="handleInput"
                class="max-width-column box"
            />
        </div>
        <div class="column entry-col">
            <div v-html="html" class="max-width-column" />
        </div>
    </div>
    <div class="columns">
        <div class="column">
            <button
                class="button is-primary is-pulled-right"
                @click="handleClick"
            >
                Save Post
            </button>
        </div>
    </div>
</template>

<style scoped>
.max-width-column {
    max-width: 100%;
    overflow-wrap: break-word;
}
.entry-col {
    max-width: 45%;
}
</style>
