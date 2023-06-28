// components
import Container from "../Container.jsx"

export default function CoutrieFlag({ countrie }) {
  return(
    <Container styles="h-64 xl:h-[15vw]">
      <img src={countrie.flags.png} alt={countrie.flags.alt} className="w-full h-full object-center" />
    </Container>
  )
}
