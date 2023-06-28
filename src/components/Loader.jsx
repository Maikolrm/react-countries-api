// components
import Container from "./Container.jsx"

export default function Loader(props) {
  return(
    <Container styles="fixed top-0 left-0 z-10 flex w-full h-full bg-white/95">
      <Container styles="m-auto">
        <Container styles="w-8 h-8 m-auto rounded-full border-2 border-transparent border-y-sky-500 animate-spin" />
        <h3 className="mt-2 font-semibold text-xs text-gray-500 uppercase leading-10 tracking-widest">
          Loading
        </h3>
      </Container>
    </Container>
  )
}
