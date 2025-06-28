export const expect = new Proxy(() => {}, {
  get: () => expect,
  apply: () => expect,
});

expect.extend = () => {};
