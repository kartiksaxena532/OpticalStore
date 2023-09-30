import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn,token } from '../env'

export const readClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token,
})

export const writeClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})