import fillText from "./index";
test('fillText test', () => {
  expect(fillText("1", 2, "0")).toBe("01");
});
