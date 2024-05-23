import { MongoClient } from "mongodb"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    const client = await MongoClient.connect('mongodb+srv://malgorzata0kowalik:KOvArPrsMnLy1nLF@cluster0.ot5bgzm.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    const db = client.db()

    const meetupsCollection = db.collection('meetups')
    const result = await meetupsCollection.insertOne(data)

    client.close()

    res.status(201).json({message: 'data inserted!'})
  }
}