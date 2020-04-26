export const random = {
  bool() {
    return Math.random() > 0.5;
  },
  int(min, max) {
    return min + Math.floor(Math.random() * (max - min));
  },
  arrayIndex(arr) {
    return Math.floor(Math.random() * arr.length);
  },
  arrayItem(arr) {
    return arr[this.arrayIndex(arr)];
  },
};
