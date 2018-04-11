<template>
    <section class="item-list page">
        <transition name="summary" mode="out-in">
            <div v-if="switching" key="true">
                <BlogSummary v-for="item in list" :key="item._id" :item="item"></BlogSummary>
            </div>
            <div v-else key="false">
                <BlogSummary v-for="item in list" :key="item._id" :item="item"></BlogSummary>
            </div>
        </transition>
        <div v-if="isShow" class="pagination">
            <a class="last" v-show="page > 1" @click="pagination(-1)">上一页</a>
            <a class="next" v-show="page < pageNumber" @click="pagination(1)">下一页</a>
        </div>
    </section>
</template>

<script>
import BlogSummary from "./../components/BlogSummary"
import { mapGetters } from "vuex"
export default {
    name: "ItemList",
    components: {
        BlogSummary
    },
    data() {
        return {
            page: 1,
            switching: true
        }
    },
    computed: {
        ...mapGetters(["list", "total", "limit"]),
        isShow() {
            return this.total > this.limit
        },
        pageNumber() {
            return Math.ceil(this.total / this.limit)
        }
    },
    asyncData({ store, route }) {
        let page = route.query.page || 1
        return store.dispatch("FETCH_ALL", {
            page,
            path: "/post",
            options: {
                select: {
                    title: 1,
                    summary: 1,
                    pathName: 1,
                    createdAt: 1
                },
                conditions: { isPublic: true },
                sort: { createdAt: -1 }
            }
        })
    },
    beforeRouteUpdate(to, from, next) {
        let page = to.query.page || this.page
        this.page = Number(page)
        next()
    },
    mounted() {
        let page = this.$route.query.page || this.page
        this.page = Number(page)
    },
    methods: {
        pagination(limit) {
            let page = this.page + limit
            this.switching = !this.switching
            this.$router.push(`/?page=${page}`)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./../assets/css/setting";
.summary-enter-active,
.summary-leave-active {
    transition: all 0.5s ease-in;
}
.summary-enter,
.summary-leave-to {
    opacity: 0;
    transform: translateX(5px);
}
.pagination {
    position: relative;
    padding: 10px 0;
    height: 45px;
    .last,
    .next {
        display: inline-block;
        position: absolute;
        color: $blue;
        cursor: pointer;
    }
    .last {
        left: 0;
    }
    .next {
        right: 0;
    }
}
</style>


