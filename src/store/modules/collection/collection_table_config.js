import { date } from 'quasar'
import AppConstant from 'src/constant/app'

export default [
  {
    name: 'id',
    field: 'id',
    label: 'ID',
    align: 'left',
    required: true
  },
  {
    name: 'unit',
    field: row => row.unit.name,
    label: 'Unit',
    align: 'left'
  },
  {
    name: 'collected_by',
    field: 'collected_by',
    label: 'Collector',
    align: 'left'
  },
  {
    name: 'total',
    field: 'total',
    label: 'Total',
    align: 'left'
  },
  {
    name: 'collected_at',
    align: 'left',
    field: 'collected_at',
    format: (val) => date.formatDate(val, AppConstant.DATE_FORMAT),
    label: 'Collected At'
  }
]
