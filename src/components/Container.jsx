export default function Container(props) {
  return(
    <div className={props.styles}>
      {props.children}
    </div>
  )
}
