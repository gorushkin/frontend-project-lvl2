export default (arr) => {
    const result = arr.slice().sort((a, b) => {
      if (a.key >= b.key) {
        return 1;
      }
      return -1;
    });
    return result;
  };
