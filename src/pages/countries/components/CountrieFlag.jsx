// components
import Container from "../../../components/Container.jsx"

export default function CoutrieFlag(props) {
  const countrie = props.countrie
  return(
    <Container styles={`${props.styles} ${props.media}`}>
      <img src={countrie.flags.png} alt={countrie.flags.alt} className="w-full h-full object-center" />
    </Container>
  )
}
