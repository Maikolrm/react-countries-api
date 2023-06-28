export default function Paragraph(props) {
  return(
    <p className={props.styles + ` text-md capitalize text-gray-700 leading-none`}>
      <span className="font-semibold text-dark-blue">
        {props.label}: {' '}
      </span>
      {props.content}
    </p>
  )
}
