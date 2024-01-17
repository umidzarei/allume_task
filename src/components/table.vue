<template>
    <div>

        <vs-table>
            <template #header>
                <div class="d-flex justify-space-between align-center px-0 px-sm-1 px-md-2 border-bottom flex-wrap">
                    <div class="my-0 py-0">
                        <div class="fw-500 h5"> {{ title }}</div>
                        <div class="smaller muted-text mt-1 mb-2">
                            <span class="mr-1">Last Updated:</span>
                            <span>{{ updatedAt }}</span>
                        </div>
                    </div>

                    <vs-input primary border v-model="search" type="search" placeholder="Search">
                        <template #icon>
                            <i class='isax isax-search-zoom-in'></i>
                        </template>
                    </vs-input>



                </div>

            </template>
            <template #thead>
                <vs-tr>
                    <vs-th style="background-color : # " v-for="(header, i) in haders" :key="i">
                        {{ header }}
                    </vs-th>
                </vs-tr>
            </template>
            <template #tbody>
                <vs-tr v-for="(tr, i) in $vs.getPage($vs.getSearch(tableData, search), page, max)" :data="tr" :key="i">
                    <vs-td v-for="(name, j) in dataNames" :key="j">
                        {{ tr[name] }}
                    </vs-td>
                </vs-tr>
            </template>
            <template #footer>
                <vs-pagination v-model="page" :length="$vs.getLength(tableData, max)" />
            </template>
        </vs-table>
    </div>
</template>


<script>
import { tableMixin } from "@/mixins/table"
export default {
    mixins: [tableMixin],
    props: {
        haders: {
            type: Array,
            required: true,
        },
        dataNames: {
            type: Array,
            required: true,
        },
        queryName: {
            type: String,
            required: true
        },
        title: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            namespace: "DataTable",
            page: 1,
            max: 10,
            search: ""
        }
    },
    mounted() {
        this.sendFlipSideApi();
    }

}
</script>

