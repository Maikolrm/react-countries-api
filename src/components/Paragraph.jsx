export default function Paragraph(props) {
  return(
    <p className={props.styles + ` text-md capitalize text-dark-blue leading-none dark:text-gray-200`}>
      <span className="font-semibold">
        {props.label}: {' '}
      </span>
      {props.content}
    </p>
  )
}
