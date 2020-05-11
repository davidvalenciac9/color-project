import sizes from './sizes';
export default {
  Navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '5vh',
  },
  logo: {
    marginRight: '15px',
    padding: '0 13px',
    fontSize: '22px',
    backgroundColor: '#eceff1',
    fontFamily: 'Roboto',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.3rem',
    fontWeight: '100',
    '& a': {
      textDecoration: 'none',
      color: 'black',
    },
    [sizes.down ('xs')]: {
      display: 'none',
    },
  },
  slider: {
    width: '300px',
    margin: '0 10px',
    display: 'inline-block',
    [sizes.down ('md')]: {
      width: '150px',
    },
  },
  selectContainer: {
    marginLeft: 'auto',
    marginRight: '1rem',
  },
};
