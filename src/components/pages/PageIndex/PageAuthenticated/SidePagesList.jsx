import { HStack, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react'

const PagesList = ({ pages }) => {
  console.log(pages)
  return (
    <Stack>
      {pages.length > 0 &&
        pages.map((page) => {
          console.log(page)
          return <SinglePageLink page={page} key={page.uuid} />
        })}

      {pages.length === 0 && <NoPages />}
    </Stack>
  )
}

export default PagesList

const SinglePageLink = ({ page }) => {
  return (
    <HStack>
      <Text>{page.emoji}</Text>
      <Text
        color={useColorModeValue('gray.900', 'teal.300')}
        fontWeight="semibold"
      >
        <Link href={`/pages/${page.uuid}`}>{page.title}</Link>
      </Text>
    </HStack>
  )
}

const NoPages = () => {
  return <Text>Aún no tienes páginas.</Text>
}
