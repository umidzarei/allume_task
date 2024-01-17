<template>
  <div id="page-wrapper" :class="{ 'page-collapsed': reduce }">
    <div @click="reduce = !reduce" class="overlay"></div>
    <vs-sidebar
      top="100px"
      notShadow
      square
      :open="open"
      fixed
      :reduce="reduce"
      :hoverExpand="reduce"
    >
      <template #logo>
        <div class="mb-14">
          <!-- <img src="@/assets/images/near3.png" /> -->
        </div>
      </template>

      <div
        v-for="item in items"
        :key="item.to"
        :id="item.to"
        :to="{ name: item.to }"
      >
        <vs-sidebar-group v-if="item.children">
          <template #header>
            <vs-sidebar-item arrow>
              <template #icon>
                <i :class="item.icon"></i>
              </template>
              {{ item.text }}
            </vs-sidebar-item>
          </template>
          <div>
            <vs-sidebar-item
              v-for="innerItem in item.children"
              :key="innerItem.to"
              :to="{ name: innerItem.to }"
              :id="innerItem.to"
              :class="{ active: $route.name === innerItem.to }"
            >
              <template #icon>
                <i class="aside-inner" :class="innerItem.icon"></i>
              </template>
              <span class="smaller">{{ innerItem.text }}</span>
            </vs-sidebar-item>
          </div>
        </vs-sidebar-group>

        <div v-else>
          <vs-sidebar-item
            :class="{ active: $route.name === item.to }"
            class="mb-1"
            :to="{ name: item.to }"
          >
            <template #icon>
              <i :class="item.icon" class="aside-icon"></i>
            </template>
            <span>{{ item.text }}</span>
          </vs-sidebar-item>
        </div>
      </div>
    </vs-sidebar>

    <vs-navbar
      square
      fixed
      notShadow
      color="#fff"
      padding-scroll
      center-collapsed
    >
      <template #left>
        <div class="d-flex align-center pl-1 pl-lg-2">
          <button @click="reduce = !reduce" class="toggle-sidebar-btn mt-1">
            <i class="isax isax-menu-1 lg"></i>
          </button>

          <h6 class="ml-3 sidebar-title">Allume Task</h6>
        </div>
      </template>
    </vs-navbar>
    <main class="pt-13 px-30">
      <Layout>
        <template v-slot:heading>
          <div class="page-heading">
            <div class="container">
              <div class="row">
                <div class="col-12 py-5 py-sm-8 py-md-10 py-lg-16">
                  <h1 class="d-flex align-center">
                    <span
                      v-for="(item, i) in $route.meta.title"
                      :key="i"
                      class="d-flex align-center"
                    >
                      <span
                        :class="{ 'muted-text fw-500 normal mt-1': i != 0 }"
                      >
                        {{ item }}
                      </span>
                      <i
                        v-if="i < $route.meta.title.length - 1"
                        class="isax isax-arrow-right-3 mx-2 md muted mt-1"
                      ></i>
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Layout>
      <div class="container pt-8">
        <vue-page-transition name="fade-in-up">
          <router-view />
        </vue-page-transition>
        <HomeFooter />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "home",
      reduce: true,
      open: true,
      items: [
        { text: "Introduction", to: "Home", icon: "isax isax-home" },
        { text: "Refrences", to: "refrences", icon: "isax isax-share" },
      ],
    };
  },
  components: {
    HomeFooter: () => import("../components/footer.vue"),
  },
  methods: {
    resizeHandler() {
      if (window.innerWidth > 1200) {
        // this.reduce = true;
      } else {
        // this.reduce = true;
      }
    },
  },
  mounted() {
    // dEventListener("resize", this.resizeHandler);
  },
  beforeMount() {
    this.resizeHandler();
  },
};
</script>

<style scoepd></style>
