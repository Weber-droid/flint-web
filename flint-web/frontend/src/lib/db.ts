import Dexie from 'dexie'
import { Request } from '../types/request'
import { Collection } from '../types/collection'
import { Environment } from '../types/environment'
import { AIInteraction } from '../types/ai'

export interface HistoryEntry {
  id: string;
  timestamp: number;
  method: string;
  url: string;
  statusCode: number;
  durationMs: number;
}

class FlintDB extends Dexie {
  requests!: Dexie.Table<Request>
  collections!: Dexie.Table<Collection>
  environments!: Dexie.Table<Environment>
  history!: Dexie.Table<HistoryEntry>
  aiHistory!: Dexie.Table<AIInteraction>

  constructor() {
    super('flint')
    this.version(1).stores({
      requests:     'id, collectionId, updatedAt',
      collections:  'id, parentId, updatedAt',
      environments: 'id, isActive',
      history:      'id, timestamp, method, url',
      aiHistory:    'id, requestId, feature, timestamp'
    })
  }
}

export const db = new FlintDB()
