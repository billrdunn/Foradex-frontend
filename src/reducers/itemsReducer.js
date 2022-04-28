// import itemsService from "../services/items";

const initialItems = [
  {
    latin: "Agaricus arvensis",
    common: ["Horse Mushroom"],
    description: {
      cap: "White, sometimes discoloured grey/brown...",
      gills: "When young the gills are almost white...",
      stem: "Stout with a large double ring.",
      flesh: "White, firm, and brusing slightly yellow.",
      spores: "Dark purple/brown.",
    },
    habitat: "Pasture, meadows, lawns, road verges, parks. Often growing in rings.",
    image:
      "https://commons.wikimedia.org/wiki/Agaricus_arvensis#/media/File:2008-08-Agaricus-Stuttgart.JPG",
    flavour: "Excellent. Smells of aniseed. Should be cooked before consumption.",
    frequency: "Common.",
  },
  {
    latin: "Agaricus augustus",
    common: ["The Prince"],
    description: {
      cap: "Spherical when young becoming convex...",
      gills: "Gills starting off white to pink, maturing to dark brown...",
      stem: "White to pale cream and smoooth above the skirt...",
      flesh: "White, sometimes with a yellow tinge where cut or bruised.",
      spores: "Dark purple/brown.",
    },
    habitat: "Mixed woodland, particularly under conifers. Lawns and roadsides.",
    image:
      "https://commons.wikimedia.org/wiki/Category:Agaricus_augustus#/media/File:Agaricus_augustus_2011_G1.jpg",
    flavour: "Excellent. Smells of bitter almonds. Should be cooked before consumption.",
    frequency: "Uncommon.",
  },
];

const itemsReducer = (state = null, action = {}) => {
  switch (action.type) {
    // case 'ADD_ITEM':
    //   return action.data

    case "INIT_ITEMS":
      return action.data;

    // case 'SET_ITEMS':
    //   return action.data

    default:
      return state;
  }
};

// export const addItem = (item) => {
//   console.log('addItem...')
//   console.log('item :>> ', item);
//   return async (dispatch) => {
//     try {
//       // itemFormRef.current.toggleVisability()
//       itemsService.setToken(item.user.token)
//       await itemsService.create(item)
//       const response = await itemsService.getAll()
//       dispatch({
//         type: 'ADD_ITEM',
//         data: response,
//       })
//       dispatch(updateNotification(`new item "${item.title}" added`, 3, false))
//     } catch (exception) {
//       dispatch(updateNotification('item could not be added', 3, true))
//     }
//   }
// }

// export const removeItem = (item) => {
//   console.log('removeItem...')
//   return async (dispatch) => {
//     try {
//       itemsService.setToken(item.user.token)
//       await itemsService.remove(item)
//       const response = await itemsService.getAll()
//       response.sort((first, second) => second.likes - first.likes)
//       dispatch({
//         type: 'SET_ITEMS',
//         data: response,
//       })
//       dispatch(updateNotification(`item "${item.title}" removed`, 3, false))
//     } catch (exception) {
//       dispatch(updateNotification('item could not be removed', 3, true))
//     }
//   }
// }

// export const likeItem = (item) => {
//   console.log('likeItem...')
//   return async (dispatch) => {
//     try {
//       itemsService.setToken(item.user.token)
//       await itemsService.update(item)
//       const response = await itemsService.getAll()
//       response.sort((first, second) => second.likes - first.likes)
//       dispatch({
//         type: 'SET_ITEMS',
//         data: response,
//       })
//       dispatch(updateNotification(`item "${item.title}" liked`, 3, false))
//     } catch (exception) {
//       dispatch(updateNotification('item could not be liked', 3, true))
//     }
//   }
// }

export const initialiseItems = () => {
  const items = initialItems;
  return {
    type: "INIT_ITEMS",
    data: items,
  };
};

// export const initialiseItems = () => (dispatch) => {
//   console.log("initialising items...");
//   //   const items = await itemsService.getAll();
//   const items = initialItems;
//   dispatch({
//     type: "INIT_ITEMS",
//     data: items,
//   });
// };

export default itemsReducer;
