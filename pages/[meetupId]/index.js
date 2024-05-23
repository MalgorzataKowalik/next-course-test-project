import { MongoClient } from "mongodb";
import MeetupDetails from "../../components/meetups/MeetupDetails";
import { ObjectId } from 'bson';
import Head from "next/head";

  // const tempProps = {
  //   id: 'm1',
  //   title: 'Meetup in Wroclaw',
  //   description: 'bla bla',
  //   address: 'Wrocław',
  //   image: 'https://images.pexels.com/photos/3790871/pexels-photo-3790871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  // }

export default function MeetupDetailsPage(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name='description' content={props.description}/>
      </Head>
      <MeetupDetails
        title={props.title}
        description={props.description}
        address={props.address}
        image={props.image}/>
    </>
  )
}

export async function getStaticProps(context) {
  //fetch
  const meetupId = context.params.meetupId
  const meetupIdObject = new ObjectId(meetupId)

  const client = await MongoClient.connect('mongodb+srv://malgorzata0kowalik:KOvArPrsMnLy1nLF@cluster0.ot5bgzm.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
  const db = client.db()
  const meetupsCollection = db.collection('meetups')
  const selectedMeetup = await meetupsCollection.findOne({_id: meetupIdObject})

  return {
    props: {
      id: meetupId,
      title: selectedMeetup.title,
      description: selectedMeetup.description,
      address: selectedMeetup.address,
      image: selectedMeetup.image
    }
  }
}

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://malgorzata0kowalik:KOvArPrsMnLy1nLF@cluster0.ot5bgzm.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
  const db = client.db()
  const meetupsCollection = db.collection('meetups')
  const meetups = await meetupsCollection.find().toArray()
  client.close()

  console.log('meetups: ', meetups)

  return {
    // paths: [
    //   {
    //     params: {
    //       meetupId: 'm1'
    //     }
    //   },
    //   {
    //     params: {
    //       meetupId: 'm2'
    //     }
    //   }
    // ],
    paths: meetups.map(meetup => ({
      params: {
        meetupId: meetup._id.toString()
      }
    })),
    fallback: true
  }
}