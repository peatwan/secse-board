export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Updates a nested property within an object immutably.
 *
 * @param obj - The original object.
 * @param path - The path to the property (dot notation string or array of keys).
 * @param value - The new value to set.
 * @returns A new object with the updated property.
 */
export const updateNestedProperty = <
  T,
  K extends keyof any, // Allows string | number | symbol
  V
>(
  obj: T,
  path: K | K[],
  value: V
): T => {
  // Normalize the path to an array
  const pathArray = Array.isArray(path) ? path : path.toString().split('.')

  // Clone the object to avoid mutations
  const newObj = { ...obj } as any

  // Reference to traverse the object
  let current: any = newObj

  // Iterate through the path, except for the last key
  for (let i = 0; i < pathArray.length - 1; i++) {
    const key = pathArray[i]

    // Ensure the key exists and is an object
    if (typeof current[key] !== 'object' || current[key] === null) {
      current[key] = {}
    } else {
      current[key] = { ...current[key] }
    }

    current = current[key]
  }

  // Set the new value at the last key
  const lastKey = pathArray[pathArray.length - 1]
  current[lastKey] = value

  return newObj
}

export const getSetDifference = <T>(setA: Set<T>, setB: Set<T>): Set<T> => {
  // Use filter and Array.from to find elements in setA that are not in setB
  return new Set([...setA].filter((item) => !setB.has(item)))
}
