import axios from 'axios'

export const paymentApi = axios.create({
  baseURL: 'https://sandbox.asaas.com/api/v3',
  headers: {
    Accept: 'application/json',
    "Content-Type": 'application/json',
    "access-token": process.env.ASAAS_TOKEN
  }
})