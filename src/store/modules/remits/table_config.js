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
    name: 'remitted_by',
    field: 'remitted_by',
    label: 'Remitted By',
    align: 'left'
  },
  {
    name: 'total',
    field: 'total',
    label: 'Total',
    align: 'left'
  },
  {
    name: 'create_at',
    align: 'left',
    field: 'created_at',
    format: val => date.formatDate(val, AppConstant.DATE_FORMAT),
    label: 'Created At'
  }
]
