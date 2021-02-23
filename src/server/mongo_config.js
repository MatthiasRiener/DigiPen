
use slideadb
show collections
db.getCollectionNames().forEach(c=>db[c].drop())
