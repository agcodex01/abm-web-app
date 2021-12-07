import { date } from 'quasar'
import AppConstant from 'src/constant/app'

export default [
  {
    name: 'amount',
    field: 'amount',
    label: 'Amount',
    align: 'left'
  },
  {
    name: 'service_number',
    align: 'left',
    field: 'service_number',
    label: 'Account #'
  },
  {
    name: 'type',
    field: row => row.biller.type,
    align: 'left',
    label: 'Type'
  },
  {
    name: 'biller',
    align: 'left',
    field: row => row.biller.name,
    label: 'Biller'
  },
  {
    name: 'number',
    align: 'left',
    field: 'number',
    label: 'Phone #'
  },
  {
    name: 'status',
    align: 'left',
    field: 'status',
    label: 'Status'
  },
  {
    name: 'create_at',
    align: 'left',
    field: 'created_at',
    format: val => date.formatDate(val, AppConstant.DATE_FORMAT),
    label: 'Created At'
  }
]
