const userListItem = ({ name, picture }) => {
  return (
    <li className="userItem">
      {
        picture?.large
        ? <div className="userItemPicture"></div>
        : <div className="imagePlaceholder"></div>
      }

      <div className="userItemUser">
        
        { 
          ( name?.last && name?.first )
          ? <span className="userItemName">{ name?.last } { name?.first }</span>
          : <span className="textPlaceholder"></span>
        }
      </div>

      <style jsx>{`
        li.userItem {
          display: flex;
          :global(+li) {
            margin-top: 15px;
          }

          %pictureStyle {
            flex: 4;
            max-height: 89px;
            padding-bottom: 35%;
            @media(min-width: 1024px) {
              padding-bottom: 30%;
            }
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }

          .userItemPicture {
            @extend %pictureStyle;
            ${!!picture?.large && `background-image: url(${picture?.large});`}
          }

          .userItemUser {
            flex: 8;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px 15px;
          }
          
          /* animation */
          @keyframes placeHolderAnimation {
              0%{
                  background-position: -468px 0;
              }
              100%{
                  background-position: 468px 0;
              }
          }
          
          %animatedBackground {
              animation-duration: 1.25s;
              animation-fill-mode: forwards;
              animation-iteration-count: infinite;
              animation-name: placeHolderAnimation;
              animation-timing-function: linear;
              background: #F6F6F6;
              background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
              background-size: 800px 104px;
              height: 89px;
              position: relative;
          }

          .imagePlaceholder {
            @extend %pictureStyle;
            @extend %animatedBackground;
          }
          
          .textPlaceholder {
            display: inline-block;
            height: 10px;
            width: 120px;
            @extend %animatedBackground;
          }
        }
      
        
      `}</style>
    </li>
  );
};

export default userListItem;
