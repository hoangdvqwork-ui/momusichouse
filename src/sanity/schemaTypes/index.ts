import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import talent from './talent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, talent],
}
