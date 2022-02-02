import { motion } from 'framer-motion';

const Backdrop = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        // opacity: '.5',
        position: 'absolute',
        zIndex: '1000',
      }}
    ></motion.div>
  );
};

export default Backdrop;
