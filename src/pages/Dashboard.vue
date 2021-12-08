<template>
  <q-page padding>
    <div class="row q-col-gutter-md q-mt-md">
      <div
        class="col-xs-12 col-md-3"
        v-for="(summary, i) in dsSummary"
        :key="i"
      >
        <ds-summary v-bind="summary" />
      </div>
    </div>
    <q-card class="q-mt-lg" flat>
      <q-card-section class="flex justify-between">
        <div class="text-subtitle2">Current Month Transactions</div>
        <div class="text-subtitle2">Total: {{ total }}</div>
      </q-card-section>
      <q-card-section>
        <div id="chart" height="500" class="shadow-2 q-py-md"></div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import DsSummary from 'src/components/dashboard/DsSummary.vue'
import ApexCharts from 'apexcharts'
import DASHBOARD from 'src/store/types/dashboard'
// import CHART from 'src/store/types/charts'
// import options from 'src/store/modules/charts/chart'

export default {
  components: { DsSummary },
  name: 'Dashboard',
  data () {
    return {
      filter: '',
      total: 0,
      chartOptions: {
        chart: {
          height: 350,
          type: 'bar',
          stacked: false
        },
        toolbar: {
          export: {
            csv: {
              filename: undefined,
              columnDelimiter: ',',
              headerCategory: 'category',
              headerValue: 'value',
              dateFormatter (timestamp) {
                return new Date(timestamp).toDateString()
              }
            },
            svg: {
              filename: undefined
            },
            png: {
              filename: 'Mothly Report'
            }
          },
          autoSelected: 'zoom'
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#ffc107', '#21ba45', '#f44336'],
        series: [
          {
            name: 'Pending',
            data: []
          },
          {
            name: 'Remmited',
            data: []
          },
          {
            name: 'Cancelled',
            data: []
          }
        ],
        stroke: {
          width: [4, 4, 4]
        },
        plotOptions: {
          bar: {
            columnWidth: '30%'
          }
        },
        xaxis: {
          categories: ['1st Week', '2nd Week', '3rd Week', '4th Week', '5th Week'],
          axisBorder: {
            show: true,
            width: '3px',
            color: '#0091EA'
          }
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              width: '3px',
              color: '#1166bd'
            },
            labels: {
              style: {
                colors: '#1166bd'
              }
            }
          }
        ],
        tooltip: {
          shared: false,
          intersect: true,
          x: {
            show: false
          }
        },
        legend: {
          horizontalAlign: 'left',
          offsetX: 40
        }
      },
      chart: null
    }
  },
  async mounted () {
    this.$store.commit('layout/SET_HEADER', 'Dashboard')
    this.$store.dispatch(
      `${DASHBOARD.namespace}/${DASHBOARD.actions.GET_DS_SUMMARY}`
    )
    await this.$store
      .dispatch(
        `${DASHBOARD.namespace}/${DASHBOARD.actions.GET_TRANSACTIONS_PREVIEW}`
      )
      .then(({ data }) => {
        this.total = this.getTotal(data.pending)
        this.total += this.getTotal(data.remitted)
        this.chartOptions.series[0].data = this.getData(data.pending)
        this.chartOptions.series[1].data = this.getData(data.remitted)
        this.chartOptions.series[2].data = this.getData(data.cancelled)
      })
    this.chart = new ApexCharts(
      document.querySelector('#chart'),
      this.chartOptions
    )
    this.chart.render()
  },
  computed: {
    ...mapGetters({
      dsSummary: 'dashboard/getDsSummary'
    })
  },
  methods: {
    getData (data) {
      if (data) return data
      return [0, 0, 0, 0, 0]
    },
    getTotal (data) {
      if (!data) return 0
      return data.reduce((a, b) => a + b)
    }
  }
}
</script>
