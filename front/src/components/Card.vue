<template>
    <div class="card">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>


<style lang="scss">
.card {
    padding: 30px 40px 0;
    .content {
        padding-bottom: 30px;
        border-bottom: 1px solid #ddd;
    }
}
</style>

