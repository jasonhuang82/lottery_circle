import get from "lodash/get";
const userListItem = ({ name, picture }) => {
  const largePicture = get(picture, "large");
  const lastName = get(name, "last");
  const firstName = get(name, "first");
  return (
    <li className="userItem">
      {
        largePicture
        ? <div className="userItemPicture"></div>
        : <div className="imagePlaceholder"></div>
      }

      <div className="userItemUser">
        
        { 
          ( lastName && firstName )
          ? <span className="userItemName">{ lastName } { firstName }</span>
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
            ${!!largePicture && `background-image: url(${largePicture});`}
          }

          .userItemUser {
            flex: 8;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px 15px;
            background-color: rgba(#F9F9F9, 0.7);
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
              background: #F3F3F3;
              background: linear-gradient(to right, #F3F3F3 8%, #eee 18%, #F3F3F3 33%);
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
