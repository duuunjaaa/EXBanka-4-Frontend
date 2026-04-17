import { apiClient } from './apiClient'

export const portfolioService = {
  async getPortfolio() {
    const { data } = await apiClient.get('/portfolio')
    return data
  },

  async getProfit() {
    const { data } = await apiClient.get('/portfolio/profit')
    return data
  },
}
