<template>
  <div class="row">
    <div class="col-12 col-sm-8 col-md-6 col-lg-4">
      <SingleChart
        query-name="users"
        title="Number of optimism blockchain users"
        column="0"
      />
    </div>

    <div class="col-12">
      <div class="row px-0">
        <div class="col-12 col-xl-6">
          <BarChart
            x-type="time"
            class="border rounded"
            title="Average transaction per user"
            query-name="general"
            :axis="{ x: 'date', y: 'transaction_per_user' }"
          />
        </div>

        <div class="col-12 col-xl-6">
          <BarChart
            x-type="time"
            class="border rounded"
            title="Daily transaction number"
            query-name="general"
            :axis="{ x: 'date', y: 'number' }"
          />
        </div>

        <div class="col-12 col-xl-6">
          <BarChart
            x-type="time"
            class="border rounded"
            title="Daily active user number"
            query-name="general"
            :axis="{ x: 'date', y: 'daily_active_user' }"
          />
        </div>

        <div class="col-12 col-xl-6">
          <LineChart
            x-type="time"
            class="border rounded"
            title="Success rate"
            query-name="Success_rate"
            :axis="{ x: 'date', y: 'success_rate' }"
          />
        </div>

        <div class="col-12 col-xl-6">
          <LineChart
            x-type="time"
            class="border rounded"
            title="price"
            query-name="general_price"
            :axis="{ x: 'date', y: 'price' }"
          />
        </div>
      </div>
    </div>
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
