<template>
    <div id="ranking-chart" class="ranking-chart">
        <apexchart
            width="100%"
            height="400px"
            type=line
            :options="chartOptions"
            :series="series"
        ></apexchart>        
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

/*
    Vue ApexCharts:
      https://apexcharts.com/docs/vue-charts/


*/

export default {
    name: 'RankingLineChart',
    components: {
        apexchart: VueApexCharts
    },
    props: {
        chartOptions: {
            type: Object,
            require: false,
            default: () => {
                return {
                    chart: {
                        height: 350,
                        zoom: { enabled: true }
                    },
                    dataLabels: { enabled: true },
                    yaxis: [
                        {
                            y: 0,
                            label: { text: 'Score' }
                        }
                    ],
                    xaxis: {
                        categories: [],
                        title: { text: 'time' }
                    }
                }
            }
        },
        xticks: {
            type: Array,
            require: false,
            default: () => []
        },
        series: {
            type: Array,
            require: false,
            default: () => []
        }
    },
    data () {
        return {

        }
    },
    methods: {
        
    },
    mounted () {
        this.chartOptions.xaxis.categories= this.xticks
    }
}
</script>