import { clientApiClient } from './clientApiClient'

export const clientPortfolioService = {
  async getPortfolio() {
    const { data } = await clientApiClient.get('/portfolio')
    return data
  },

  async getProfit() {
    const { data } = await clientApiClient.get('/portfolio/profit')
    return data
  },
}
