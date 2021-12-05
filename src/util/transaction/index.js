import Color from 'util/colors'
import { BILLER_TYPE } from 'src/store/types/billers'

export const CREATED_AT = {
  TODAY: {
    label: 'Today',
    value: 'today'
  },
  THIS_WEEK: {
    label: 'This week',
    value: 'this_week'
  },
  THIS_MONTH: {
    label: 'This month',
    value: 'this_month'
  },
  ALL: {
    label: 'All',
    value: 'all'
  }
}

export const STATUS_TYPE = {
  PENDING: 'pending',
  REMITTED: 'remitted',
  CANCELLED: 'cancelled'
}

export function getStatusTypes () {
  return [
    STATUS_TYPE.PENDING,
    STATUS_TYPE.REMITTED,
    STATUS_TYPE.CANCELLED
  ]
}

export function getCreateAtOptions () {
  return Object.values(CREATED_AT)
}

export function getStatusColor (status) {
  switch (status) {
    case STATUS_TYPE.PENDING:
      return Color.WARNING
    case STATUS_TYPE.REMITTED:
      return Color.POSITIVE
    case STATUS_TYPE.CANCELLED:
      return Color.NEGATIVE
  }
}
export function getTypeColor (type) {
  switch (type) {
    case BILLER_TYPE.WATER.value:
      return 'primary'
    case BILLER_TYPE.ELECTRICITY.value:
      return 'amber'
    case BILLER_TYPE.INTERNET.value:
      return 'secondary'
  }
}
export function remittable (status) {
  return STATUS_TYPE.REMITTED === status
}
const TransactionUtil = {
  getStatusColor: getStatusColor,
  getTypeColor: getTypeColor,
  remittable: remittable
}

export default TransactionUtil
