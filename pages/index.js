import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'
import Head from 'next/head'

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>React meetups</title>
        <meta name='description' content='Browse the most interesting meetups in the world'/>
      </Head>
      <MeetupList meetups={props.meetups}/>
    </>
  )
}

export async function getServerSideProps(context) {
  const client = await MongoClient.connect('mongodb+srv://malgorzata0kowalik:KOvArPrsMnLy1nLF@cluster0.ot5bgzm.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
  const db = client.db()
  const meetupsCollection = db.collection('meetups')
  const meetups = await meetupsCollection.find().toArray()

  client.close()

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    }
  
  }
}

// export async function getStaticProps() {
//   const client = await MongoClient.connect('mongodb+srv://malgorzata0kowalik:KOvArPrsMnLy1nLF@cluster0.ot5bgzm.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
//   const db = client.db()
//   const meetupsCollection = db.collection('meetups')
//   const meetups = await meetupsCollection.find().toArray()

//   client.close()

//   return {
//     props: {
//       meetups: meetups.map(meetup => ({
//         title: meetup.title,
//         address: meetup.address,
//         image: meetup.image,
//         id: meetup._id.toString()
//       }))
//     },
//     revalidate: 30
  
//   }
// }