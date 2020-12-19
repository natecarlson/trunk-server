import {
  FETCH_SOURCES,
  FETCH_SUCCESS_SOURCES,
  FETCH_ERROR_SOURCES
} from "./sources-constants";

function updateObject(oldObject, newValues) {
    // Encapsulate the idea of passing a new object as the first parameter
    // to Object.assign to ensure we correctly copy data instead of mutating
    return Object.assign({}, oldObject, newValues);
}

function updateItemInArray(array, itemId, updateItemCallback) {
    const updatedItems = array.map(item => {
        if(item.id !== itemId) {
            // Since we only want to update one item, preserve all others as they are now
            return item;
        }

        // Use the provided callback to create an updated item
        const updatedItem = updateItemCallback(item);
        return updatedItem;
    });

    return updatedItems;
}

const sources = (
  state = {
    isWaiting: false,
    items: {}},
  action
) => {
  switch (action.type) {

    case FETCH_SOURCES:
    case FETCH_SUCCESS_SOURCES:
    /* return Object.assign({}, state, {
        isWaiting: false,
        items: {
          ...state.items,
          [action.data.shortName]: action.data.sources
        }
      }); */
    case FETCH_ERROR_SOURCES:

    default:
      return state;
  }
};

export default sources;
