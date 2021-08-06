import React, { useEffect, useState } from 'react'
import ThemeButton from '../buttons/ThemeButton'
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Image,
  HStack,
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'
import { LOGO_URL } from '../../constants'
import EnterProfileButton from '../buttons/EnterProfileButton'
import LogoutButton from '../buttons/LogoutButton'
import { signOut } from 'next-auth/client'

function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        {/* HAMBURGER */}
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>

        {/* LOGO CENTRO */}
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link href={'/'} className="disableFocus">
            <Flex ml={4} alignItems="center">
              <Image style={{ width: '30px' }} src={LOGO_URL} alt="" />
              <Text
                fontFamily="sans-serif"
                fontWeight="bold"
                fontSize={{ base: '12px' }}
                display={{ base: 'none', md: 'block' }}
              >
                Los Junior
              </Text>
            </Flex>
          </Link>

          {/* NAV ITEMS */}
          <Flex display={{ base: 'none', md: 'flex' }} ml={5}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <EnterProfileButton />
          <HStack
            display={{ base: 'none', md: 'flex' }}
            justify="center"
            align="center"
            spacing="5"
          >
            <LogoutButton />
            <ThemeButton />
          </HStack>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

const DesktopNav = () => {
  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.id}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href}
                fontSize={'sm'}
                fontWeight={500}
                color={useColorModeValue('gray.600', 'gray.200')}
                _hover={{
                  textDecoration: 'none',
                  color: useColorModeValue('gray.800', 'white'),
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                // bg={useColorModeValue('white', 'gray.800')}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'green.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'green.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  )
}

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <MobileNavItem {...{ label: 'Logout', callback: signOut }} />
      <ThemeButton />
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href, callback }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        onClick={callback ? callback : () => null}
        href={href}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
          zIndex="20"
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

const NAV_ITEMS = [
  {
    id: 1,
    label: 'Blog',
    href: '/blog',
    // children: [
    //   {
    //     label: 'Lo más reciente',
    //     subLabel: 'Echa un vistazo a lo que habla la comunidad.',
    //     href: '/blog',
    //   },
    //   {
    //     label: 'Tutoriales',
    //     subLabel: 'Django, React, CSS y más',
    //     href: '/blog/tutoriales',
    //   },
    //   {
    //     label: 'Crear post',
    //     subLabel: 'Aprendiste algo nuevo? Haz un post al respecto.',
    //     href: '/blog/post/create',
    //   },
    // ],
  },
  // {
  //   id: 2,
  //   label: 'Páginas',
  //   href: '/pages',
  //   children: [
  //     {
  //       label: 'Vuélvete un Junior',
  //       subLabel: 'Toma nuestros cursos gratis',
  //       href: '/cursos',
  //     },
  //     {
  //       label: 'WebDev Masterclass',
  //       subLabel: 'La guía definitiva para ser junior',
  //       href: '/masterclass',
  //     },
  //   ],
  // },
  // {
  //   id: 3,
  //   label: 'Mantra',
  //   href: '/mantra',
  //   children: [
  //     {
  //       label: 'Fetch1',
  //       subLabel: 'Testing the API',
  //       href: '/test1',
  //     },
  //     {
  //       label: 'WebDev Masterclass',
  //       subLabel: 'Testing the API',
  //       href: '/test2',
  //     },
  //   ],
  // },
]

export default WithSubnavigation
