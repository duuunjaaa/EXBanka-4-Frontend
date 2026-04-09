import { clientApiClient } from './clientApiClient'
import { listingFromApi } from '../models/Listing'

export const clientSecuritiesService = {
  async getListings({ type, exchange, ticker, name, page, pageSize, sortBy, sortOrder } = {}) {
    const params = {}
    if (type)       params.type      = type
    if (exchange)   params.exchange  = exchange
    if (ticker)     params.ticker    = ticker
    if (name)       params.name      = name
    if (page        != null) params.page     = page
    if (pageSize    != null) params.pageSize = pageSize
    if (sortBy)     params.sortBy    = sortBy
    if (sortOrder)  params.sortOrder = sortOrder
    const { data } = await clientApiClient.get('/securities', { params })
    return {
      ...data,
      items: (data.listings ?? data.items ?? data).map(listingFromApi),
    }
  },

  async getListingById(id) {
    const { data } = await clientApiClient.get(`/securities/${id}`)
    return listingFromApi(data.summary ?? data)
  },

  async getStocks(opts = {}) {
    return this.getListings({ ...opts, type: 'STOCK' })
  },

  async getFutures(opts = {}) {
    return this.getListings({ ...opts, type: 'FUTURES_CONTRACT' })
  },
}
