1. Get All Collection Names
   const collections = await mongoose.connection.db.listCollections().toArray();

2. Drop a Collection
   await mongoose.connection.db.dropCollection(collectionName);

3. Rename a Collection
   await mongoose.connection.db.renameCollection(oldName, newName);

4. Check if a Collection Exists
   const collections = await mongoose.connection.db.listCollections({ name: collectionName }).toArray();
   if (collections.length > 0) ....

5. Create a New Collection
   await mongoose.connection.db.createCollection(collectionName);

6. Drop All Collections in the Database

const collections = await mongoose.connection.db.listCollections().toArray();
for (const collection of collections) {
await mongoose.connection.db.dropCollection(collection.name);
console.log(`Collection '${collection.name}' dropped.`);
}
console.log('All collections dropped.');

8.  Clear (Delete All Documents) in a Collection
    const result = await mongoose.connection.db.collection(collectionName).deleteMany({});

9.  List Indexes for a Collection
    const indexes = await mongoose.connection.db.collection(collectionName).indexes();

10. Create an Index
    const result = await mongoose.connection.db.collection(collectionName).createIndex(index);

11. Drop an Index
    await mongoose.connection.db.collection(collectionName).dropIndex(indexName);

12. Drop All Indexes in a Collection
    const result = await mongoose.connection.db.collection(collectionName).dropIndexes();

13. Count Documents in a Collection
    const count = await mongoose.connection.db.collection(collectionName).countDocuments();

14. Clone a Collection
    const sourceCollection = mongoose.connection.db.collection(source);
    const targetCollection = mongoose.connection.db.collection(target);

        const docs = await sourceCollection.find().toArray();
        if (docs.length > 0) {
          await targetCollection.insertMany(docs);
          console.log(`Cloned '${source}' into '${target}'.`);}
