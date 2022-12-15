export const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN || ''
export const BUSINESS_PORTAL_DOMAIN = process.env.BUSINESS_PORTAL_DOMAIN || ''

export const BRANCH_SERVICE_HOST = process.env.BRANCH_SERVICE_HOST || ''
export const QUEUE_SERVICE_HOST = process.env.QUEUE_SERVICE_HOST || ''
export const GOOGLE_FIREBASE_DYNAMIC_LINK_API_KEY = process.env.GOOGLE_FIREBASE_KEY || ''
export const SUSPEND_QUEUE_INPUT = {
  PARTNER: 0,
  BRANCH: 1,
  CUSTOMER: 2
}

export const COLLECTION_NAMES = {
  MESSAGE_METRICS: "message_metrics"
}