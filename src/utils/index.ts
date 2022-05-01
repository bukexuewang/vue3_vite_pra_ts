const isEmpty = (val: unknown) =>
  val === undefined ||
  val === null ||
  (typeof val === 'object' && Object.keys(val).length === 0) ||
  (typeof val === 'string' && val.trim() === '')

type IsEmptyParamType = FnParamType<typeof isEmpty>[0]
