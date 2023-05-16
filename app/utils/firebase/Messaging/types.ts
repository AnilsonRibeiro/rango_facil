export interface IMessaging {
  requestPermission: () => Promise<void>
  setupNotificationToken: () => Promise<void>
  setupNotificationListener: () => void
}
