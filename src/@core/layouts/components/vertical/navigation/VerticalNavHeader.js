import Link from 'next/link'
import { Box, IconButton, useMediaQuery } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ArrowLeft01Icon, ArrowLeftDoubleIcon } from 'hugeicons-react'

// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  padding: '12px 17px',
  transition: 'padding .25s ease-in-out',
  boxShadow: '-9px 0 20px rgba(89, 102, 122, 0.1)'
}))

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = props => {
  // ** Props
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props

  const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'))

  return (
    <MenuHeaderWrapper className='nav-header'>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Link href='/' passHref>
            <StyledLink>
              {/* <HeaderTitle variant='h6'>{themeConfig.templateName}</HeaderTitle> */}
              <img src='/favicon.png' alt='logo' width={35} />
            </StyledLink>
          </Link>
          <Box className='actions-left' ml={3.5}>
            {/* <img src={logoUrls} alt={`Company Logo`} style={{ width: 35, height: 35 }} /> */}
            <IconButton color='inherit' onClick={props.toggleNavVisibility}>
              {isDesktop ? <ArrowLeftDoubleIcon /> : <ArrowLeft01Icon />}
            </IconButton>
          </Box>
        </Box>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
