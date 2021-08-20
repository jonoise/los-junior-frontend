import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Input,
  Button,
  Text,
  Stack,
  useToast,
  HStack,
  InputRightAddon,
  InputGroup,
  Tooltip,
  InputLeftAddon,
  useColorMode,
} from '@chakra-ui/react'
import { v4 as uuid_v4 } from 'uuid'
import { customAlphabet } from 'nanoid'
import useDidMount from '../../../../hooks/useDidMount'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { checkPercentages } from './gradeUtilities'
import { AiFillPlusSquare } from 'react-icons/ai'

import { addComponent } from '../../pageSlice'
import { useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { FaGraduationCap, FaRegQuestionCircle } from 'react-icons/fa'
import ShowTotalPercentageRow from './ShowTotalPercentageRow'

function GradesModal() {
  const { colorMode } = useColorMode()
  const [dueDate, setDueDate] = useState({ initialEvaluation: null })
  const initialInputFocus = useRef()
  const newTaskInputFocus = useRef()
  const nanoid = customAlphabet('1234567890abcdef', 10)

  const dispatch = useDispatch()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  // Initial Grade Object
  const initialGrade = {
    uuid: uuid_v4(),
    course: '',
    type_of: 'grade',
    evaluations: {
      initialEvaluation: {
        id: 'initialEvaluation',
        title: '',
        dueDate: null,
        points: 0,
        maxPercentage: 0,
        percentage: 0, // -> actual grade for this evaluation
      },
    },
    evaluationsIds: ['initialEvaluation'],
    maxGrade: 0,
    grade: 0,
  }

  const [gradeComponent, setGradeComponent] = useState(initialGrade)

  const createNewEvaluation = () => {
    const newEvaluation = {
      id: nanoid(),
      title: '',
      dueDate: null,
      points: 0,
      maxPercentage: 0,
      percentage: 0,
    }

    console.log(newEvaluation)

    setGradeComponent({
      ...gradeComponent,
      evaluations: {
        ...gradeComponent.evaluations,
        [newEvaluation.id]: newEvaluation,
      },
      evaluationsIds: [...gradeComponent.evaluationsIds, newEvaluation.id],
    })
  }

  const handleCourseInputChange = (e) => {
    const course = initialInputFocus.current.value
    setGradeComponent({
      ...gradeComponent,
      course: course,
    })
  }

  const handleEvaluationInputs = (e) => {
    const [eval_ID, name] = e.target.name.split('-')
    let value = e.target.value
    if (name === 'maxPercentage') {
      value = Number.parseInt(e.target.value)
    }
    setGradeComponent({
      ...gradeComponent,
      evaluations: {
        ...gradeComponent.evaluations,
        [eval_ID]: {
          ...gradeComponent.evaluations[eval_ID],
          [name]: value,
        },
      },
    })
  }

  const addToState = () => {
    for (let i in gradeComponent.evaluationsIds) {
      // We use this variables for warning displays
      const eval_ID = gradeComponent.evaluationsIds[i]
      const currentEvaluation = gradeComponent.evaluations[eval_ID]
      const validPercetages = checkPercentages(gradeComponent)

      if (gradeComponent.course === '') {
        toast({
          title: 'Rellena el curso.',
          description: 'Qué asignatura estás cursando?',
          id: eval_ID,
          duration: 5000,
          status: 'error',
        })
        return
      }

      if (
        currentEvaluation.title === '' ||
        currentEvaluation.maxPercentage === null ||
        currentEvaluation.dueDate === null
      ) {
        toast({
          title: 'Asegúrate de rellenar todos los espacios requeridos.',
          description: 'Para más info, desliza sobre el signo de pregunta.',
          id: eval_ID,
          duration: 5000,
          status: 'error',
        })
        return
      }

      if (!validPercetages) {
        toast({
          title: 'Revisa los porcentajes.',
          description: 'La suma de los porcentajes debe ser 100.',
          id: eval_ID,
          duration: 5000,
          status: 'error',
        })
        return
      }
    }

    dispatch(addComponent(gradeComponent))
    setGradeComponent(initialGrade)
    setDueDate({ initialEvaluation: null })
    onClose()
  }

  //   useEffect(() => {
  //     if (didMount) {
  //       // Si el component se acaba de montar,
  //       // no vamos a efectuar ninguna acción. Solo on re-renders
  //       return
  //     }
  //     // Cada vez que creemos un nuevo Task vamos a hacerle focus al input.
  //     document
  //       .getElementById(
  //         gradeComponent.evaluationsIds[gradeComponent.evaluationsIds.length - 1]
  //       )
  //       .focus()
  //   }, [gradeComponent.evaluationsIds])
  useEffect(() => {
    let totalPercentage = 0
    for (let eval_ID in gradeComponent.evaluations) {
      const currentEvaluation = gradeComponent.evaluations[eval_ID]
      totalPercentage += currentEvaluation.maxPercentage
    }
    setGradeComponent({
      ...gradeComponent,
      grade: totalPercentage,
    })
  }, [gradeComponent.evaluations])

  return (
    <>
      <Tooltip
        hasArrow
        label="Calificaciones"
        bg="white"
        color="black"
        placement="right"
      >
        <Button
          p="0"
          m="0"
          size="sm"
          opacity=".9"
          _hover={{ opacity: '1' }}
          transition="0.5s all"
          align="center"
          justify="center"
          onClick={onOpen}
          className="disableFocus"
        >
          <FaGraduationCap size="20px" />
        </Button>
      </Tooltip>
      <Modal
        size="5xl"
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialInputFocus}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agrega las evaluaciones de tu curso:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Flex id="title" align="center" w="full">
                <Text>Curso:</Text>
                <Input
                  ref={initialInputFocus}
                  onChange={handleCourseInputChange}
                  ml="2"
                />
              </Flex>
              <Flex justify="space-between">
                <Text>Evaluación</Text>
                <Text>Fecha Límite</Text>
                <Text>Porcentaje</Text>
                <Text>Nota de la evaluación</Text>
              </Flex>

              {gradeComponent.evaluationsIds.map((id, index) => (
                <HStack id="tasks" align="center" key={id}>
                  {/* --> EVALUATION INPUT <-- */}
                  <InputGroup size="sm">
                    <Tooltip
                      hasArrow
                      placement="top"
                      label="(Requerido) Por ejemplo: Tarea #1."
                      aria-label="Input example"
                    >
                      <InputLeftAddon children={<FaRegQuestionCircle />} />
                    </Tooltip>
                    <Input
                      onChange={handleEvaluationInputs}
                      ref={newTaskInputFocus}
                      placeholder="Agrega una evaluación"
                      name={`${id}-title`}
                    />
                  </InputGroup>

                  {/* --> DUEDATE INPUT <-- */}
                  <InputGroup size="sm">
                    <Tooltip
                      hasArrow
                      placement="top"
                      label="(Requerido) Cuándo te toca entregar o rendir?"
                      aria-label="Input example"
                    >
                      <InputLeftAddon children={<FaRegQuestionCircle />} />
                    </Tooltip>
                    <DatePicker
                      className={
                        colorMode === 'light' ? '' : 'date-picker-dark'
                      }
                      selected={dueDate[id]}
                      onChange={(date) => {
                        setDueDate((prev) => ({ ...prev, [id]: date }))
                        setGradeComponent({
                          ...gradeComponent,
                          evaluations: {
                            ...gradeComponent.evaluations,
                            [id]: {
                              ...gradeComponent.evaluations[id],
                              dueDate: date.toDateString(),
                            },
                          },
                        })
                      }}
                    />
                  </InputGroup>

                  {/* --> PERCENTAGE INPUT <-- */}
                  <InputGroup size="sm">
                    <Tooltip
                      hasArrow
                      placement="top"
                      label="(Requerido) Porcentaje de la evaluación."
                      aria-label="Input example"
                    >
                      <InputLeftAddon children={<FaRegQuestionCircle />} />
                    </Tooltip>
                    <Input
                      onChange={handleEvaluationInputs}
                      ref={newTaskInputFocus}
                      placeholder="Porcentaje"
                      name={`${id}-maxPercentage`}
                      type="number"
                      textAlign="right"
                    />
                  </InputGroup>

                  {/* --> CALIFICACIÓN INPUT <-- */}
                  <InputGroup size="sm">
                    <Tooltip
                      hasArrow
                      placement="top"
                      label="Dejar en blanco si no has rendido."
                      aria-label="Input example"
                    >
                      <InputLeftAddon children={<FaRegQuestionCircle />} />
                    </Tooltip>
                    <Input
                      onChange={handleEvaluationInputs}
                      ref={newTaskInputFocus}
                      placeholder="Nota de la evaluación."
                      name={`${id}-points`}
                      type="number"
                      textAlign="right"
                    />
                  </InputGroup>
                </HStack>
              ))}
              <ShowTotalPercentageRow grade={gradeComponent.grade} />

              <Flex id="settings" align="center" px="6">
                <Button p="0" size="xs" onClick={createNewEvaluation}>
                  <AiFillPlusSquare />
                </Button>
              </Flex>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={addToState}>Crear</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GradesModal
