export default function validateMongoDBId(id: string) {
  return id.match(/^[0-9a-fA-F]{24}$/);
}
