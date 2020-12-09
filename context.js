// CONTEXT

// <App>
//     <Provider value={lang}>
//         <HomePag >
//             <Dashboard >
//                 <NewNotifications >
//                 </NewNotifications>
//             </Dashboard>
//         </HomePag>
//
//         <SupportPage >
//             <MyOpenTickets/>
//                 <TeamSpace >
//                     <Consumer>
//                        {
//                          (lang) => {
//                             return (
//                                  <Chat lang={lang}>
//                                  </Chat>
//                             )
//                          }
//                        }
//                     </Consumer>
//                 </TeamSpace>
//         </SupportPage>
//     </Provider>
// </App>