const InfoStack = () => {
  return (
    <div>
      {techStack
        ? techStack.map((tech) => {
            return tech.icon
          })
        : ''}
    </div>
  )
}

export default InfoStack
