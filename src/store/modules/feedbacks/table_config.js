import { date } from 'quasar'
import AppConstant from 'src/constant/app'

export default [
  {
    name: 'collapse',
    field: 'collapse',
    label: 'Collapse',
    align: 'center',
    sortable: true
  },
  {
    name: 'unit',
    field: row => row.unit.name,
    label: 'Unit',
    align: 'center',
    sortable: true
  },
  {
    name: 'biller',
    field: row => row.account.biller.name,
    label: 'Biller',
    align: 'center',
    sortable: true
  },
  {
    name: 'service_no',
    field: row => row.account.service_number,
    label: 'Service No',
    align: 'center',
    sortable: true
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
