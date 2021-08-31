function fillText (string = "", minLength = 0, fillText = "0") {
  const fillCount = minLength - string.length;
  let result = "";
  if (fillCount > 0) {
    const fillList = new Array(fillCount).fill(fillText);
    fillList.forEach(item => {
      result += item;
    });

    return `${result}${string}`;
  }

  return string;
}

export default fillText;
