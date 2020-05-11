import sizes from './sizes';
import background from './bg.svg';
export default {
  '@global': {
    '.fade-exit': {
      opacity: '1',
    },
    '.fade-exit-active': {
      opacity: '0',
      transition: 'opacity 0.3s ease-out',
    },
  },
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    /* background by SVGBackgrounds.com */
    backgroundColor: '#d900ff',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    overflow: 'scroll',
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [sizes.down ('xl')]: {
      width: '80%',
    },
    [sizes.down ('xs')]: {
      width: '60%',
    },
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    '& a': {
      color: 'white',
      textDecoration: 'none',
      borderBottom: '1px solid white',
      paddingBottom: '8px',
    },
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '2rem',
    [sizes.down ('md')]: {
      gridTemplateColumns: 'repeat(2, 50%)',
    },
    [sizes.down ('xs')]: {
      gridTemplateColumns: 'repeat(1, 100%)',
    },
  },
  heading: {
    fontSize: '2rem',
  },
};
