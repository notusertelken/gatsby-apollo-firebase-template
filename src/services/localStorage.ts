// this is opinionated:
// we use localstorage to persist values (IE. token for apollo link)
// and repopulate reactive variables,
// because reactive variables are ephimeral
export const storeIdToken = (idToken: string | null): void => {
  // safe check for ssr
  if (typeof window !== 'undefined') {
    if (!idToken) localStorage.removeItem('idToken')
    localStorage.setItem('idToken', idToken as string)
  }
}

export const getIdToken = (): string | null => {
  if (typeof window !== 'undefined') {
    const idToken = localStorage.getItem('idToken')
    if (!idToken) return null
    return idToken as string
  }
  return null
}

// implement here other persistence functions.
