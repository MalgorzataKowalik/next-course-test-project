import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'
import Head from 'next/head'

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'Meetup in Wroclaw',
    description: 'bla bla',
    address: 'Wrocław',
    image: 'https://images.pexels.com/photos/3790871/pexels-photo-3790871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'm2',
    title: 'Meetup in Prague',
    description: 'bla bla',
    address: 'Prague',
    image: 'https://images.pexels.com/photos/126292/pexels-photo-126292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
]

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

// export async function getServerSideProps(context) {
//   //fetch
//     const {req, res} = context

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
  
//   }
// }

export async function getStaticProps() {
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
    },
    revalidate: 30
  
  }
}