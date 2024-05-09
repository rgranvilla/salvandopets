import '@fastify/swagger';

declare module '@fastify/swagger' {
  export type SchemaObject = ArraySchemaObject | NonArraySchemaObject;
}
