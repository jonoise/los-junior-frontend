import {
  Badge,
  Button,
  Flex,
  HStack,
  Tooltip,
  useToast,
} from '@chakra-ui/react'
import { RiSave3Fill, RiFileCopyFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import axios from '../../../../../lib/axios'
import { selectStateMarkdownContent } from './markdownEditorSlice'
import { selectPageSettings } from '../../../pageSettingsSlice'
import { useSession } from 'next-auth/client'
import { useEffect } from 'react'
import { useState } from 'react'

const MarkdownEditorNav = () => {
  const toast = useToast()
  const content = useSelector(selectStateMarkdownContent)
  const [session] = useSession()

  const [unsavedContent, setUnsavedContent] = useState(false)
  const [backuptimer, setBackuptimer] = useState(false)

  const { currentComponentId } = useSelector(selectPageSettings)

  useEffect(() => {
    const timer = setTimeout(() => {
      setBackuptimer(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    backuptimer && setUnsavedContent(true)
  }, [content])

  const handleSaveContent = async () => {
    try {
      const res = await axios(
        'PATCH',
        `/pages/markdown/${currentComponentId}/`,
        { content: content },
        session
      )
      if (res) {
        setUnsavedContent(false)
        toast({
          id: 'markdown saved',
          title: 'Guardado 💌',
          status: 'success',
          duration: '2000',
        })
      }
    } catch (error) {
      toast({
        id: 'markdown not saved',
        title: `Algo salió mal`,
        description: 'Vulve a intentarlo 🚫',
        status: 'error',
        duration: '2000',
      })
    }
  }

  const handleCopyContent = async () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        toast({
          id: 'markdown copied',
          title: `Copiado ✅`,
          status: 'success',
          duration: '2000',
        })
      })
      .catch((err) => {
        toast({
          id: 'markdown error',
          title: `Algo salió mal`,
          description: 'Vulve a intentarlo 🚫',
          status: 'success',
          duration: '2000',
        })
      })
  }

  return (
    <>
      <HStack>
        <Tooltip label="Guardar" fontSize="13px">
          <Button
            transition="1s ease"
            cursor="pointer"
            p="0"
            m="0.5"
            size="xs"
            outline="none"
          >
            <RiSave3Fill fontSize="25px" onClick={handleSaveContent} />
          </Button>
        </Tooltip>
        <Tooltip label="Copíar" fontSize="13px">
          <Button
            transition="1s ease"
            cursor="pointer"
            p="0"
            m="0.5"
            size="xs"
            outline="none"
          >
            <RiFileCopyFill fontSize="25px" onClick={handleCopyContent} />
          </Button>
        </Tooltip>
        <Badge
          colorScheme="red"
          opacity={unsavedContent ? 1 : 0}
          transition=".7s all"
        >
          Hay cambios sin guardar
        </Badge>
      </HStack>
    </>
  )
}

export default MarkdownEditorNav
