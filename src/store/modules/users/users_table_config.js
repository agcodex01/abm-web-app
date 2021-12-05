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
    name: 'email',
    field: 'email',
    label: 'Email',
    align: 'left'
  },
  {
    name: 'status',
    field: 'disabled',
    label: 'Status',
    align: 'left'
  },
  {
    name: 'roles',
    field: row => row.roles,
    label: 'Role',
    align: 'left'
  }
]
