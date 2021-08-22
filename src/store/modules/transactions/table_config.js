import { date } from 'quasar'

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
    label: 'Service Number',
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
    name: 'unit',
    field: row => row.unit.name,
    label: 'Unit',
    align: 'left',
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
    format: val => date.formatDate(val, 'ddd D MMM YYYY'),
    label: 'Created At'
  }
]
