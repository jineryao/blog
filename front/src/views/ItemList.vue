<template>
    <section class="item-list page">
        <BlogSummary v-for="item in 5" :key="item"></BlogSummary>
    </section>
</template>

<script>
import BlogSummary from "./../components/BlogSummary"
export default {
    name: "ItemList",
    components: {
        BlogSummary
    }
}
</script>

