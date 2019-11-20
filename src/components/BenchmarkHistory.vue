<template>
    <div class="benchmark-history">
        <v-data-table
            :headers="historyTableheaders"
            :items="benchmarkHistoryTableItems"
            :rows-per-page-items="benchmarkHistoryRowsPerPageItems"
            class="elevation-1"
         >
            <template v-slot:items="props">
             <td class="text-xs">{{ props.item.epochMilliSeconds }}</td>
             <td class="text-xs">{{ props.item.scrore }}</td>
             <td class="text-xs">{{ props.item.status }}</td>
             <!-- <td class="text-xs">{{ props.item.comment }}</td> -->
           </template>
           <template v-slot:item.comment="{item}">
               <td class="text-xs"><span v-html="item.comment"></span></td>
           </template>
          </v-data-table>
    </div>
</template>

<script>
// import moment from 'moment';

export default {
    name: 'BenchmarkHistory',
    props: {
        benchmarkHistoryLimits: {
            type: Number,
            default: 10000
        },
        benchmarkHistoryTableItems: {
            type: Array,
            require: false,
            default: () => []
        },
        benchmarkHistoryRowsPerPageItems: {
            type: Array,
            require: false,
            default: () => [1000]
        }
    },
    data () {
        return {
            historyTableheaders: [
                {text: 'Created', value: 'epochMilliSeconds', sortable: false},
                {text: 'Socre', value: 'score', sortable: false},
                {text: 'Status', value: 'status', sortable: false},
                {text: 'Comment', value: 'comment', sortable: false}
            ],
            tostring: ""
        }
    },
    methods: {

    },
    mounted: async function () {
    },
    // filters: {
    //     moment: function (epochMilliSeconds) {
    //         // let date = new Date(epochMilliSeconds)
    //         this.tostring = epochMilliSeconds
    //         return ""
    //         // return moment(date).format('YYYY/MM/DD HH:mm');
    //     }
    // }
}
</script>