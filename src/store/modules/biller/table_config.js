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
    name: 'name',
    field: 'name',
    label: 'Name',
    align: 'left'
  },
  {
    name: 'type',
    field: 'type',
    label: 'Type',
    align: 'left'
  },
  {
    name: 'create_at',
    align: 'left',
    field: 'created_at',
    format: (val) => date.formatDate(val, AppConstant.DATE_FORMAT),
    label: 'Created At'
  }
]
