import classes from './MeetupDetails.module.css'

export default function MeetupDetails(props) {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.description} />
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <address>{props.address}</address>
    </section>
  )
}