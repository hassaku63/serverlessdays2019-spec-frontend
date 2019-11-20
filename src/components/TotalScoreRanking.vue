<template>
    <div class="ranking">
        <v-data-table
            :headers="rankingTableHeaders"
            :items="rankingTableItems"
            :items-per-page=30
            disable-filtering
            hide-default-footer
            class="elevation-1"
         >
            <template v-slot:item.score="{item}">
                <td class="text-xs">{{ item.score | numberformat }}</td>
            </template>
            <template v-slot:item.team="{item}">
                <td class="text-xs"><router-link v-bind:to="{ name : 'history', params : { team: item.team }}">{{ item.team }}</router-link></td>
            </template>
          </v-data-table>
    </div>
</template>

<script>
export default {
    name: 'TotalScoreRanking',
    props: {
        benchmarkHistoryLimits: {
            type: Number,
            default: 30
        },
        rankingTableItems: {
            type: Array,
            require: false,
            default: () => []
        }
    },
    data () {
        return {
            rankingTableHeaders: [
                {text: 'Rank', value: 'rank', sortable: false},
                {text: 'Team', value: 'team', sortable: false},
                {text: 'Score', value: 'score', sortable: false}
            ]
        }
    },
    methods: {
        
    },
    computed: {
        
    },
    mounted: async function () {
        
    },
    filters: {
        numberformat: function (score) {
            return Number(score).toLocaleString()
        }
    }
}
</script>