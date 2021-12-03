// *****footer kept reloading and causing errors will need to investigate this more on a later date**********


// import React from "react";
// import styled from "styled-components";
//
// const StyledFooter = styled.div `
//   .wrapper {
//     background-color: #61dafb;
//     display: flex;
//     height: 25vh;
//     width: 100%;
//
//     .social-media-container {
//       height: 10vh;
//       width: 5.5vh;
//       display: flex;
//       flex-direction: column;
//
//       img {
//         margin: 5px;
//         height: 5vh;
//         width: 5vh;
//
//         a {
//           width: 5vh;
//           height: 5vh;
//         }
//       }
//     }
//     .contact-me-info-container {
//       height: 10vh;
//       display: flex;
//       margin-left: 80vh;
//       display: flex;
//       flex-direction: column;
//     }
//   }
// `
//
// export const Footer = (props) => {
//   const {data} = props;
//
//   return (
//     <StyledFooter>
//       <div className="footer-wrapper">
//         <div className="social-media-container">
//           <a href="http://www.twitter.com" target="_blank">
//             <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="twitter-icon"/>
//           </a>
//           <a href="http://www.facebook.com" target="_blank">
//             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/768px-Facebook_icon_2013.svg.png" alt="facebook-icon"/>
//           </a>
//           <a href="http://www.patreon.com" target="_blank">
//             <img src="data:image/png;base64,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" alt="patreon-icon"/>
//           </a>
//           <a href="http://www.linkedin.com" target="_blank">
//             <img src="data:image/png;base64,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" alt="linkedin-icon"/>
//           </a>
//         </div>
//         <div className="contact-me-info-container">
//           <p>Questions? Concerns? Feel free to contact us!</p>
//           <p>Email: gamebooky@gmail.com</p>
//           <p>Call us: 777-777-7777</p>
//           <p>Busiess  hours: 9-5 Monday-Friday Pacific Time</p>
//         </div>
//       </div>
//     </StyledFooter>
//   );
// }





// ////////
// .wrapper {
//   display: flex;
//   flex-flow: column nowrap;
//   height: 100%;
//
// .main-text {
//     display: flex;
//     align-content: center;
//     justify-content: center;
//     height: 150px;
//     flex-shrink: 0;
//
//   .main-text-content {
//       font-family: Copperplate;
//       letter-spacing: 2px;
//       font-size: large;
//       width: 60vw;
//     }
//   }
//
// .main-image-box {
//     display: flex;
//     flex-flow: column nowrap;
//     width: 100%;
//
//   .row {
//       display: flex;
//       flex-flow: row nowrap;
//
//     .image-container {
//         padding: 16px;
//
//         img {
//         }
//       }
//
//     .image-box-message-container {
//         padding-left: 12px;
//         font-family: "Times New Roman";
//         letter-spacing: 2px;
//         font-size: x-large;
//       }
//     }
//   }
//
// .footer {
//     background-color: #61dafb;
//     display: flex;
//     flex-flow: row nowrap;
//     //position: fixed;
//     padding: 56px;
//     //bottom: 0;
//     width: 94%;
//     //height: 150px;
//     bottom: 0;
//     overflow: auto;
//     padding-bottom: 5.8rem;
//
//   .social-media-container {
//       display: flex;
//       flex-direction: column;
//       width: 50%;
//
//       img {
//         margin: 5px;
//         height: 32px;
//         width: 32px;
//
//         a {
//           height: 32px;
//           width: 32px;
//         }
//       }
//     }
//
//   .contact-me-info-container {
//       display: flex;
//       flex-direction: column;
//     }
//   }
//
// }
