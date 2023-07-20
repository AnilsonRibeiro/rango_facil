/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */

import axios, { AxiosInstance } from "axios"
import Config from "../../config"

import type { ApiConfig } from "./api.types"
import { loadString, saveString } from "../../utils/storage"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  client: AxiosInstance
  config: ApiConfig

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.client = axios.create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    this.setToken()
  }

  private setToken() {
    loadString("rango_facil:accessToken").then((token) => {
      this.setAuthorizationToken(token)
    })
  }

  setAuthorizationToken(token: string) {
    this.client.defaults.headers.Authorization = `Bearer ${token}`
    return saveString("rango_facil:accessToken", token)
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
