import { motion } from 'framer-motion';

const Backdrop = () => {
  return (
    <motion.div
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
    ></motion.div>
  );
};

export default Backdrop;
