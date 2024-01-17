<template>
    <div class="row">

        <div class="col-12">
            <div class="row">
                <div class="col-12 col-md-4">
                    <SingleChart query-name="nft_seals" name="" title="Average price per NFT US dollars" column="3" />
                </div>

                <div class="col-12 col-md-4">
                    <SingleChart query-name="nft_seals" name="" title="Number of unique NFTs" column="2" />
                </div>

                <div class="col-12 col-md-4">
                    <SingleChart query-name="nft_seals" name="" title="Number of marketplaces" column="0" />
                </div>
                <div class="col-12 col-md-4">
                    <SingleChart query-name="nft_seals" name="" title="Users number" column="1" />
                </div>
            </div>
        </div>

        <div class="col-12 col-xl-6">
            <BarChart x-type="time" class="border rounded" title="weekly seals number" query-name="nft_seals"
                :axis="{ x: 'date', y: 'number' }" label="Weekly seals" />
        </div>

        <div class="col-12 col-xl-6">
            <LineChart x-type="time" class="border rounded" title="Cumulative weekly seals volume US dollars" query-name="nft_seals"
                :axis="{ x: 'date', y: 'c_volume' }" />
        </div>


        <div class="col-12 col-xl-6">
            <BarChart x-type="time" class="border rounded" title="Weekly seals volume US dollars" query-name="nft_seals"
                :axis="{ x: 'date', y: 'volume' }" label="Weekly seals" />
        </div>


    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    components: {
        BarChart: () => import("@/components/charts/bar.vue"),
        LineChart: () => import("@/components/charts/line.vue"),
        SingleChart: () => import("@/components/charts/single.vue")
    }
}
</script>