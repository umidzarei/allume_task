<template>
  <div class="row">

    <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
      <SingleChart query-name="nft" name="number" title="Total NFT mint" column="0" />
    </div>

    <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
      <SingleChart query-name="nft" name="number" title="Total platform number" column="1" />
    </div>

    <div class="col-12 col-xl-6">
      <LineChart x-type="time" class="border rounded" title="Cumulative NFT mint per day" query-name="nft"
        :axis="{ x: 'datee', y: 'c_number' }" />
    </div>


    <div class="col-12 col-xl-6">
      <BarChart x-type="time" class="border rounded" title="NFT mint per day"
        query-name="nft" :axis="{ x: 'datee', y: 'number' }"  label="NFT mint" />
    </div>

    <!-- <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
      <SingleChart query-name="nft" name="number" title="Total NFT mint" column="0" />
    </div>


    <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
      <SingleChart query-name="nft" name="number" title="Total minter number" column="2" />
    </div>


    <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
      <SingleChart query-name="nft" name="number" title="Total project number" column="1" />
    </div>


    <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
      <SingleChart query-name="nft" name="number" title="Average mint price per NFT (NEAR)" column="4" />
    </div>

    <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
      <SingleChart query-name="nft" name="number" title="Total mint price (NEAR)" column="3" />
    </div>

    <div class="col-12">
      <DoughnutChart query-name="NFT-number-per-platform" label="NFT number per platform" class="border rounded"
        :some-in-group="{ by: 'tx_receiver', over: 'number' }" />
    </div>

    <div class="col-12">
      <BarChart query-name="NFT-number-per-platform" title="NFT number per platform" class="border rounded"
        label="NFT" :axis="{ x: 'tx_receiver', y: 'number' }" :chart-colors="6" dot-format-date />
    </div>

    <div class="col-12">
      <LineChart query-name="Cumulative-Daily-NFT-mint" title="Cumulative Daily NFT mint" class="border rounded"
        :axis="{ x: 'date', y: 'cumulative_number' }" />
    </div>


    <div class="col-12">
      <BarChart query-name="Daily-NFT-mint" title="Daily NFT mint" class="border rounded" label="TX Receiver"
        :axis="{ x: 'date', y: 'number' }" />
    </div> -->

  </div>

</template>

<script>
export default {
  data() {
    return {};
  },
  components: {
    BarChart: () => import("@/components/charts/bar.vue"),
    // DoughnutChart: () => import("@/components/charts/doughnut.vue"),
    LineChart: () => import("@/components/charts/line.vue"),
    // MixedChart: () => import("@/components/charts/mixed.vue"),
    SingleChart: () => import("@/components/charts/single.vue"),
  },
};
</script>
