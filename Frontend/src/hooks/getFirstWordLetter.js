export const getFirstWordLower = (str) => {
    if (!str) return "";
    return str.trim().split(" ")[0].toLowerCase();
  };