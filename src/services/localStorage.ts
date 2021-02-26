// reactive variables dont persist.
// this approach can be used to persist them reactive variables

export const storeMyVar = (myVar: any | null): void => {
  // safe check for ssr
  if (typeof window !== 'undefined') {
    if (!myVar) localStorage.removeItem('myVar')
    localStorage.setItem('myVar', myVar as any)
  }
}

export const getMyVar = (): any | null => {
  // safe check for ssr
  if (typeof window !== 'undefined') {
    const myVar = localStorage.getItem('myVar')
    if (!myVar) return null
    return myVar as any
  }
  return null
}
