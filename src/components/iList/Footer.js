const Footer = ({ length }) => {
  return (
    <footer>
      <p>
        {length} List {length === 1 ? 'item' : 'items'}
      </p>
      <p>Copyright &copy; 2021 </p>
    </footer>
  );
};

export default Footer;
