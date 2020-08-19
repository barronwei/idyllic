const transformFileList = require("../app/utils/transformFileList")

test("transformFileList single", () => {
  expect(transformFileList(["a/b/c/d.js"])).toEqual({
    c: {
      dirs: {},
      ents: { "d.js": { file: "d.js", path: "a/b/c/d.js" } },
      name: "c",
    },
  })
})

test("transformFileList folder", () => {
  expect(
    transformFileList(["a/b/c/d.js", "a/b/e/f.js", "a/b/g.js", "a/b/h.js"])
  ).toEqual({
    b: {
      dirs: {
        c: {
          dirs: {},
          ents: { "d.js": { file: "d.js", path: "a/b/c/d.js" } },
          name: "c",
        },
        e: {
          dirs: {},
          ents: { "f.js": { file: "f.js", path: "a/b/e/f.js" } },
          name: "e",
        },
      },
      ents: {
        "g.js": { file: "g.js", path: "a/b/g.js" },
        "h.js": { file: "h.js", path: "a/b/h.js" },
      },
      name: "b",
    },
  })
})
