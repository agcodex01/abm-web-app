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
    name: 'name',
    field: 'name',
    label: 'Name',
    align: 'left',
    sortable: true
  },
  {
    name: 'email',
    field: 'email',
    label: 'Email',
    align: 'left',
    sortable: true
  },
  {
    name: 'roles',
    field: row => row.roles,
    label: 'Roles',
    align: 'left',
    sortable: true
  }
]
