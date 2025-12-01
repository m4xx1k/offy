export function capitalize(str: string) {
  const textArr = str.toLowerCase().split("");
  textArr[0] = textArr[0].toUpperCase();
  return textArr.join("");
}
