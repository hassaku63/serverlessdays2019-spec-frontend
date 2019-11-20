<template>
  <div id='scorebaord'>
    <v-container fluid>
      <v-layout column>

        <!-- <v-flex>
          <h1>summary</h1>
          <p>いい感じにサマリっぽい数字を表示したい場所</p>
          <p>Your name: {{ email }}</p>
          <p>Your team score is 12345</p>
          <v-btn @click="queryChartData()">Qeury</v-btn>
          <RankingLineChart
            :xticks="xticks"
            :series="series"
          ></RankingLineChart>
        </v-flex> -->
        
        <v-flex my-4>
          <!-- Top score -->
          <h1>History</h1>
          <v-switch
            v-model="autoreload"
            :label="`自動更新`"
          ></v-switch>
          <BenchmarkHistory
            my-3
            :benchmark-history-limits="benchmarkHistoryLimits"
            :benchmark-history-table-items="benchmarkHistoryTableItems"
            :benchmark-history-rows-per-page-items="benchmarkHistoryRowsPerPageItems"
          ></BenchmarkHistory>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import _ from "lodash"
// import * as queries from '@/graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'
import { default as BenchmarkHistory } from '@/components/BenchmarkHistory'
// import { default as TotalScoreRanking } from '@/components/TotalScoreRanking'
// import { default as RankingLineChart } from '@/components/RankingLineChart'

export default {
  components: {
      // RankingLineChart,
      // TotalScoreRanking
      BenchmarkHistory
    },
    data: () => {
      return {
        // xticks: [0,1,2,3],
        // series: [
        //   {name: 'Your Team', data: [100, 105, 98, 100]},
        //   {name: 'Top Team', data: [90, 92, 93, 105]}
        // ],
        team: "",
        history: "",
        benchmarkHistoryLimits: 10000,
        benchmarkHistoryTableItems: [
          // {epochMilliSeconds: 1571554654000,score: 10000,status: 'SUCCESS',comment: 'aaaaa'}
        ],
        benchmarkHistoryRowsPerPageItems: [1000],
        autoreload: true
      }
    },
    computed: {
    },
    methods: {
      async getHistoryData () {
        // let listItems = `query listBenchmarkHistory {
        //     listBenchmarkResultHistorys(team: "${this.team}",limit: 10000,sortDirection: DESC){
        //         items {
        //           epochMilliSeconds
        //           score
        //           status
        //           comment
        //         }
        //     }
        // }`
        let listItems = `query listBenchmarkHistory {
            listBenchmarkResultHistorys(team: "${this.team}",limit: 10000){
                items {
                  epochMilliSeconds
                  score
                  status
                  comment
                }
            }
        }`
        const lists = await API.graphql(graphqlOperation(listItems))
        // return lists.data.listBenchmarkResultHistorys.items.map((item)=>{
        //   item.epochMilliSeconds = new Date(item.epochMilliSeconds).toLocaleString()
        //   return item
        // })
        // eslint-disable-next-line
        console.log(lists.data.listBenchmarkResultHistorys.items)
        return _.chain(lists.data.listBenchmarkResultHistorys.items)
          .orderBy(['epochMilliSeconds'], ['desc'])
          .map((item)=>{
            item.epochMilliSeconds = new Date(item.epochMilliSeconds).toLocaleString()
            item.comment = _.replace(item.comment, '\n', '<br/>')
            return item
          })
          .value()
        // this.$log.debug("---DASHBOARD LIST-",lists)
        // return lists.data.listBenchmarkResultHistorys.items
      }
    },
    async beforeCreate () {
      
    },
    async mounted () {
      this.team = this.$route.params.team
      this.benchmarkHistoryTableItems = await this.getHistoryData()       

      API.graphql(
        graphqlOperation(`subscription onAddBenchmarkResultHistory {
          onAddBenchmarkResultHistory(team: "${this.team}") {
            epochMilliSeconds
            score
            status
            comment
          }
        }`
      )).subscribe({
        next: async(eventData) => {
          if (this.autoreload){
            var benchmarkResult = eventData.value.data.onAddBenchmarkResultHistory
            benchmarkResult.epochMilliSeconds = new Date(benchmarkResult.epochMilliSeconds).toLocaleString()
            // eslint-disable-next-line
            // console.log(benchmarkResult)
            this.benchmarkHistoryTableItems.unshift(benchmarkResult)
          }
        }
      })

    }
};
</script>
