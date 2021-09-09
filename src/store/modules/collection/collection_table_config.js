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
    field: 'unit',
    label: 'Unit',
    align: 'left',
    sortable: true
  },
  {
    name: 'collector',
    field: 'collector',
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
    name: 'biller',
    field: 'biller',
    label: 'Biller',
    align: 'left',
    sortable: true
  },
  {
    name: 'create_at',
    align: 'left',
    field: 'created_at',
    format: (val) => date.formatDate(val, AppConstant.DATE_FORMAT),
    label: 'Created At',
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
