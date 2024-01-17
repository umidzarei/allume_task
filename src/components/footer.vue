<template>
    <div class="border-top next-prev-pages mt-16 pt-6 d-flex flex-wrap justify-space-between">

        <!-- prev link  -->
        <span>
            <router-link v-if="$route.meta.prev" :to="{ name: $route.meta.prev.link }" class=" previous">
                <span>
                    <svg class="mr-1" width="10" height="10" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 19.9201L8.47997 13.4001C7.70997 12.6301 7.70997 11.3701 8.47997 10.6001L15 4.08008"
                            stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    <span class="primary-text fw-500">Previous</span>
                </span>
                <span class="muted-text fw-400 smaller mt-2 mr-1">{{ $route.meta.prev.text }}</span>
            </router-link>
        </span>


        <!-- next link  -->
        <span>
            <router-link v-if="$route.meta.next" :to="{ name: $route.meta.next.link }" class="next">
                <span>
                    <span class="primary-text fw-500">Next</span>
                    <svg class="ml-1" width="10" height="10" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.90961 20.67C8.71961 20.67 8.52961 20.6 8.37961 20.45C8.08961 20.16 8.08961 19.68 8.37961 19.39L14.8996 12.87C15.3796 12.39 15.3796 11.61 14.8996 11.13L8.37961 4.61002C8.08961 4.32002 8.08961 3.84002 8.37961 3.55002C8.66961 3.26002 9.14961 3.26002 9.43961 3.55002L15.9596 10.07C16.4696 10.58 16.7596 11.27 16.7596 12C16.7596 12.73 16.4796 13.42 15.9596 13.93L9.43961 20.45C9.28961 20.59 9.09961 20.67 8.90961 20.67Z"
                            fill="#292D32" />
                    </svg>
                </span>
                <span class="muted-text fw-400 smaller mt-2 mr-1">{{ $route.meta.next.text }}</span>
            </router-link>
        </span>

    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style scoped lang="scss">
.next-prev-pages {
    padding-bottom: 100px;
}

a {
    border: 1px solid #dadde1;
    display: inline-flex !important;
    flex-direction: column;
    border-radius: 10px;
    transition: 0.3s ease;
    min-width: 300px;
    padding: 20px 40px;
    margin-bottom: 10px !important;

    &.previous {
        text-align: left;
    }

    &.next {
        text-align: right;
    }

    &:hover {
        border-color: rgba(var(--vs-primary));
        -webkit-box-shadow: 0 0 0 0px rgba(var(--vs-primary));
        box-shadow: 0 0 0 0px rgba(var(--vs-primary));
    }
}
</style>