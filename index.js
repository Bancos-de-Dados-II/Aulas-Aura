var neo4j = require('neo4j-driver');
require('dotenv').config();

(async () => {
  // URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
  const URI = process.env.NEO4J_URI
  const USER = process.env.NEO4J_USERNAME
  const PASSWORD = process.env.NEO4J_PASSWORD
  let driver

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
    const serverInfo = await driver.getServerInfo()
    console.log('Connection established')
    console.log(serverInfo)

    let { records, summary } = await driver.executeQuery(
        'MERGE (p:Pessoa {nome: $name})',  
         { name: 'Alice' },  
         { database: 'neo4j' }  
      )
      console.log(
        `Created ${summary.counters.updates().nodesCreated} nodes ` +
        `in ${summary.resultAvailableAfter} ms.`
      )

    await driver.close();

  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
})();