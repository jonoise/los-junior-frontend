import { Link, Stack, Text, useColorModeValue } from '@chakra-ui/react'

const PagesList = ({ pages }) => {
  return (
    <Stack>
      {pages.length > 0 &&
        pages.map((page) => {
          return <SinglePageLink page={page} />
        })}

      {pages.length === 0 && <NoPages />}
    </Stack>
  )
}

export default PagesList

const SinglePageLink = ({ page }) => {
  return (
    <Link>
      <Text
        color={useColorModeValue('gray.900', 'teal.300')}
        fontWeight="semibold"
      >
        {page.title}
      </Text>
    </Link>
  )
}

const NoPages = () => {
  return <Text>Aún no tienes páginas.</Text>
}
