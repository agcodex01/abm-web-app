import { date } from 'quasar'
import AppConstant from 'src/constant/app'

export default [
  {
    name: 'amount',
    field: 'amount',
    label: 'Amount',
    align: 'left',
    sortable: true
  },
  {
    name: 'service_number',
    align: 'left',
    field: 'service_number',
    label: 'Service #',
    sortable: true
  },
  {
    name: 'type',
    field: row => row.biller.type,
    align: 'left',
    label: 'Type',
    sortable: true
  },
  {
    name: 'biller',
    align: 'left',
    field: row => row.biller.name,
    label: 'Biller',
    sortable: true
  },
  {
    name: 'number',
    align: 'left',
    field: 'number',
    label: 'Phone #',
    sortable: true
  },
  {
    name: 'status',
    align: 'left',
    field: 'status',
    label: 'Status',
    sortable: true
  },
  {
    name: 'create_at',
    align: 'left',
    field: 'created_at',
    format: val => date.formatDate(val, AppConstant.DATE_FORMAT),
    label: 'Created At'
  }
]
