
const HeadingTitle = ({ title, type }) => {
  const TitleType = type || "h3";

  return (
    <TitleType>
      { title }
      <style jsx>{`
        h1, h2, h3, h4, h5 {
          margin: 0;
          margin-bottom: 15px;
        }
        h3 {
          
        }
      `}</style>
    </TitleType>
  );
};

export default HeadingTitle;
