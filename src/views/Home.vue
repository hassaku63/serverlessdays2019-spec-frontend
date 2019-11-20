<template>
  <div id='scorebaord'>
    <v-container fluid>
      <v-layout column>
        <!-- Ranking -->
        <v-flex my-4>
          <h1>Ranking</h1>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <TotalScoreRanking
            my-3
            :ranking-limits="rankingLimits"
            :ranking-table-items="rankingTableItems"
          ></TotalScoreRanking>
        </v-flex>

        <!-- <v-btn dark primary @click="onRefresh()">Refresh</v-btn> -->

        <!-- Menchmark history -->
        <!-- <v-flex my-4>
          <h2 my-4>Benchmark History</h2>
          <p>Your latest {{ benchmarkHistoryLimits }} benchmark results</p>

          <BenchmarkHistory
            my-3
            :benchmark-history-limits="benchmarkHistoryLimits"
            :benchmark-history-table-items="benchmarkHistoryTableItems"
          ></BenchmarkHistory>
        </v-flex> -->
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { API, graphqlOperation} from "aws-amplify"
import _ from "lodash"
// import * as queries from '@/graphql/queries'
// import * as subscriptions from '@/graphql/subscriptions'

// import { default as BenchmarkHistory } from '@/components/BenchmarkHistory'
import { default as TotalScoreRanking } from '@/components/TotalScoreRanking'
// import { default as RankingLineChart } from '@/components/RankingLineChart'

export default {
  components: {
      // RankingLineChart,
      TotalScoreRanking,
      // BenchmarkHistory
    },
    data: () => {
      return {
        rankingLimits: 30,
        rankingTableItems: [],
      }
    },
    computed: {
      
    },
    methods: {
      async getRanking () {
        const ret = await API.graphql(
          graphqlOperation(`query listBenchmarkResults {
            listBenchmarkResults(limit: ${this.rankingLimits}) {
              items {
                team
                score
              }
            }
          }`
        ))
        return _.chain(ret.data.listBenchmarkResults.items)
          .orderBy(['score'], ['desc'])
          .map(function(val, i) {
            // let xtime = new Date(2019, 9, 21, 16, 30);
            // let now = Date.now()
            // if (now > xtime.getTime()){
              // return {
              //   'team': "xxxxxx",
              //   'score': 0,
              //   'rank': i + 1
              // }

            // } else {
              return {
                'team': val['team'],
                'score': val['score'],
                'rank': i + 1
              }

            // }
          }).value()
      },
      // onRefresh () {
      //   this.getRankingPromise().then((result) => {
      //       const items = result.data.listBenchmarkResults.items
      //       this.rankingTableItems = 
      //         _.chain(items)
      //           .orderBy(['score'], ['desc'])
      //           .map(function (val, i) {
      //             return {
      //             'team': val['team'],
      //             'score': val['score'],
      //             'rank': i + 1
      //             }
      //           })
      //           .value()
      //        // eslint-disable-next-line
      //       console.log(this.rankingTableItems)
      //   })
      // }
    },
    async beforeCreate () {
      
    },
    async mounted () {
      // eslint-disable-next-line
      console.log('this.getRanking()')
      // eslint-disable-next-line
      console.log(await this.getRanking())
      
      this.rankingTableItems = await this.getRanking()
      
      // Subscription
      API.graphql(
        graphqlOperation(`subscription OnAddBenchmarkResult {
          onAddBenchmarkResult {
            team
            score
          }
        }`
      )).subscribe({
        next: async (eventData) => {
          const record = await eventData.value.data.onAddBenchmarkResult
          // eslint-disable-next-line
          // console.log(record)
          this.rankingTableItems = _.chain(this.rankingTableItems)
            .map(function (val) {
              if (record.team == val.team) {
                return {
                  team: record['team'],
                  score: record['score']
                }
              } else {
                return val
              }
            })
            .orderBy(['score'], ['desc'])
            .map(function (val, i) {
            // let xtime = new Date(2019, 9, 21, 16, 30);
            // let now = Date.now()
            // if (now > xtime.getTime()){
            //     return {
            //       'team': "xxxxxx",
            //       'score': 0,
            //       'rank': i + 1
            //     }
            //   } else {
                return {
                'team': val['team'],
                'score': val['score'],
                'rank': i + 1
                }

              // }
            })
            .value()
        }
      })
    }
};
</script>
