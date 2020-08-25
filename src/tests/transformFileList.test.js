import { transformFileList } from "../app/utils/transformFileList"

test("transformFileList single", () => {
  const list = ["a/b/c/d.js"]
  expect(transformFileList(list)).toEqual([
    {
      id: 1,
      label: "c",
      children: [
        {
          id: 2,
          label: "d.js",
          path: "a/b/c/d.js",
        },
      ],
    },
  ])
})

test("transformFileList folder", () => {
  const list = ["a/b/c/d.js", "a/b/e/f.js", "a/b/g.js", "a/b/h.js"]
  expect(transformFileList(list)).toEqual([
    {
      id: 1,
      label: "b",
      children: [
        {
          id: 2,
          label: "c",
          children: [{ id: 3, label: "d.js", path: "a/b/c/d.js" }],
        },
        {
          id: 4,
          label: "e",
          children: [{ id: 5, label: "f.js", path: "a/b/e/f.js" }],
        },
        { id: 6, label: "g.js", path: "a/b/g.js" },
        { id: 7, label: "h.js", path: "a/b/h.js" },
      ],
    },
  ])
})
