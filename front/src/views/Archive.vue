<template>
    <div class="archive">
        <Card>
            <Disqus></Disqus>
        </Card>
    </div>
</template>

<script>
import Disqus from "./../components/Disqus"
import Card from "./../components/Card"

export default {
    name: "archive",
    components: {
        Disqus,
        Card
    }
}
</script>
