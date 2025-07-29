import { createSelector } from "reselect";

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

let randomSelectionsCache = {
  data: {},
  timestamp: 0,
  productLength: 0
};

export const selectProductsItems = (state) => state.products?.items.data || [];

function shouldRefreshCache(products) {
  const currentTime = Date.now();
  const twelveHoursInMs = 12 * 60 * 60 * 1000;
  
  return (
    !randomSelectionsCache.timestamp ||
    (currentTime - randomSelectionsCache.timestamp) > twelveHoursInMs ||
    (products.length !== randomSelectionsCache.productLength)
  );
}

function getOrCreateRandomSelections(products) {
  if (shouldRefreshCache(products)) {
    randomSelectionsCache = {
      data: {
        nineItems: generateRandomItems(products, 10),
        sixItems: generateRandomItems(products, 6),
        fourItems: generateRandomItems(products, 4),
        twelveItems : generateRandomItems(products, 12),
        threeToNineItems: generateRandomItems(products, Math.floor(Math.random() * 7) + 3),
        oneItem: generateRandomItems(products, 2),
        fromGroups: generateRandomFromEachGroup(products, 6)
      },
      timestamp: Date.now(),
      productLength: products.length
    };
  }
  
  return randomSelectionsCache.data;
}

function generateRandomItems(products, count) {
  if (!products || !products.length) return [];
  if (!count || count <= 0) return [];
  if (count >= products.length) return [...products];
  
  const shuffled = shuffleArray(products);
  return shuffled.slice(0, count);
}

function generateRandomFromEachGroup(products, groupSize = 6) {
  if (!products || !products.length || groupSize <= 0) return [];
  
  const totalGroups = Math.floor(products.length / groupSize);
  const result = [];
  
  for (let i = 0; i < totalGroups; i++) {
    const groupStart = i * groupSize;
    const randomOffset = Math.floor(Math.random() * groupSize);
    result.push(products[groupStart + randomOffset]);
  }
  
  return result;
}

export const getNineRandomItems = createSelector(
  [selectProductsItems],
  (products) => getOrCreateRandomSelections(products).nineItems || []
);

export const getSixRandomItems = createSelector(
  [selectProductsItems],
  (products) => getOrCreateRandomSelections(products).sixItems || []
);

export const getFourRandomItems = createSelector(
  [selectProductsItems],
  (products) => getOrCreateRandomSelections(products).fourItems || []
);

export const getTwelveRandomItems = createSelector(
  [selectProductsItems],
  (products) => getOrCreateRandomSelections(products).twelveItems || []
);

export const getRandomThreeToNineItems = createSelector(
  [selectProductsItems],
  (products) => getOrCreateRandomSelections(products).threeToNineItems || []
);

export const getOneRandomItems = createSelector(
  [selectProductsItems],
  (products) => getOrCreateRandomSelections(products).oneItem || []
);

export const getRandomFromEachGroup = createSelector(
  [selectProductsItems],
  (products) => getOrCreateRandomSelections(products).fromGroups || []
);

export const refreshRandomSelections = () => {
  randomSelectionsCache.timestamp = 0; 
};