import { date } from 'quasar'

export default [
  {
    name: 'id',
    field: 'id',
    label: 'ID',
    align: 'left',
    required: true
  },
  {
    name: 'insertedAmount',
    field: 'insertedAmount',
    label: 'Inserted Amount',
    align: 'left'
  },
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
    name: 'unit',
    field: row => row.unit.name,
    label: 'Unit',
    align: 'left'
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
    format: val => date.formatDate(val, 'ddd D MMM YYYY'),
    label: 'Created At'
  }
]
