import { useEffect, useRef } from 'react'

function useDidMount() {
  const didMountRef = useRef(true)

  useEffect(() => {
    didMountRef.current = false
  }, [])
  return didMountRef.current
}

export default useDidMount
