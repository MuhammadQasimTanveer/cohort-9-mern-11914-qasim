export const getFirstName = (fullName?: string | null) => {
  if (!fullName?.trim()) {
    return 'there'
  }

  return fullName.trim().split(/\s+/)[0]
}

export const getUserInitials = (fullName?: string | null) => {
  if (!fullName?.trim()) {
    return '?'
  }

  const parts = fullName.trim().split(/\s+/)

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}
