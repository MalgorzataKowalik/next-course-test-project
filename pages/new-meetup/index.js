import { useRouter } from "next/router"
import NewMeetupForm from "../../components/meetups/NewMeetupForm"
import Head from "next/head"

export default function NewMeetupPage() {
  const router = useRouter()

  async function handleAddMeetup(meetupData) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    router.push('/')
  }
  return (
    <>
      <Head>
        <title>New meetup</title>
        <meta name='description' content='Add new meetup and create new opportunities!'/>
      </Head>
      <NewMeetupForm onAddMeetup={handleAddMeetup}/>
    </>
  )
}