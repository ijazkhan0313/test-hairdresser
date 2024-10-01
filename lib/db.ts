import Dexie, { type Table } from 'dexie'

export interface AudioSource {
  id?: number;
  name: string;
  buffer: ArrayBuffer;
}

export default class Database extends Dexie {
  // 'audiosources' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  audiosources!: Table<AudioSource>

  constructor () {
    super('audiosources')
    this.version(1).stores({
      audiosources: '++id, &name' // Primary key and indexed props
    })
  }
}
export const db = new Database()
