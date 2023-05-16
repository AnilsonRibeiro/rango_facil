import "@react-native-firebase/app"
import FBMessaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging"
import { IMessaging } from "./types"

class FirebaseMessaging implements IMessaging {
  messaging: FirebaseMessagingTypes.Module
  constructor(instance: typeof FBMessaging) {
    this.messaging = instance()
  }

  // Solicitar permissão para receber notificações push
  async requestPermission() {
    try {
      await this.messaging.requestPermission()
      console.log("Permissão para receber notificações concedida.")
    } catch (error) {
      console.log("Erro ao solicitar permissão:", error)
    }
  }

  // Configurar o token de notificação do dispositivo
  async setupNotificationToken() {
    try {
      await this.messaging.registerDeviceForRemoteMessages()

      // Obter o token de notificação do dispositivo
      const token = await this.messaging.getToken()
      console.log("Token de notificação:", token)

      // Envie o token para o seu servidor ou faça o que for necessário
      // ...

      // Ouvir mudanças no token de notificação
      this.messaging.onTokenRefresh((newToken) => {
        console.log("Token de notificação atualizado:", newToken)

        // Atualize o token no servidor ou faça o que for necessário
        // ...
      })
    } catch (error) {
      console.log("Erro ao configurar o token de notificação:", error)
    }
  }

  // Configurar o ouvinte para receber notificações
  setupNotificationListener() {
    // Configurar o ouvinte para receber notificações em primeiro plano
    this.messaging.onMessage(async (remoteMessage) => {
      console.log("Notificação recebida em primeiro plano:", remoteMessage)

      // Trate a notificação recebida em primeiro plano
      // ...
    })

    // Configurar o ouvinte para receber notificações em segundo plano ou quando o aplicativo estiver fechado
    this.messaging.setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Notificação recebida em segundo plano:", remoteMessage)

      // Trate a notificação recebida em segundo plano
      // ...
    })
  }
}
const messaging = new FirebaseMessaging(FBMessaging)

export { messaging }
