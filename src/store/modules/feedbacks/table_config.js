import { date } from 'quasar'
import AppConstant from 'src/constant/app'

export default [
  {
    name: 'collapse',
    field: 'collapse',
    label: 'Expand',
    align: 'center'
  },
  {
    name: 'unit',
    field: row => row.unit.name,
    label: 'Unit',
    align: 'center'
  },
  {
    name: 'biller',
    field: row => row.account.biller.name,
    label: 'Biller',
    align: 'center'
  },
  {
    name: 'service_no',
    field: row => row.account.service_number,
    label: 'Account #',
    align: 'center'
  },
  {
    name: 'created_at',
    align: 'center',
    field: 'created_at',
    format: (val) => date.formatDate(val, AppConstant.DATE_FORMAT),
    label: 'Created At',
    sortable: true,
    sortOrder: 'ad'
  }
]
