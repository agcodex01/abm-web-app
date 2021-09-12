import { date } from 'quasar'
import AppConstant from 'src/constant/app'

export default [
  {
    name: 'id',
    field: 'id',
    label: 'ID',
    align: 'left',
    required: true,
    sortable: true,
    sortOrder: 'ad'
  },
  {
    name: 'unit',
    field: row => row.unit.name,
    label: 'Unit',
    align: 'left',
    sortable: true
  },
  {
    name: 'collected_by',
    field: 'collected_by',
    label: 'Collector',
    align: 'left',
    sortable: true
  },
  {
    name: 'total',
    field: 'total',
    label: 'Total',
    align: 'left',
    sortable: true
  },
  {
    name: 'collected_at',
    align: 'left',
    field: 'collected_at',
    format: (val) => date.formatDate(val, AppConstant.DATE_FORMAT),
    label: 'Collected At',
    sortable: true,
    sortOrder: 'ad'
  },
  {
    name: 'actions',
    field: 'actions',
    label: 'Actions',
    align: 'left'
  }
]
