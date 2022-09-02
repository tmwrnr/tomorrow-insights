/**
 * Check if at least one element match the condition
 */
export const atLeastOne = <T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => boolean
): boolean => {
  const results = array.filter(predicate);
  return results.length > 0;
};

/**
 * Replace an item in an array
 * @param array Array where to replace item
 * @param item Item to replace
 * @param identifier Key of object for comparison
 */
export const replaceItem = <T extends {}>(
  array: T[],
  item: T,
  identifier: keyof T
): T[] => {
  const index = array.findIndex(
    (element) => element[identifier] === item[identifier]
  );

  return index < 0
    ? [...array, item]
    : [...array.slice(0, index), item, ...array.slice(index + 1)];
};

/**
 * Remove an item in an array
 * @param array Array where to remove item
 * @param item Item to remove
 * @param identifier Key of object for comparison
 */
export const removeItem = <T extends {}>(
  array: T[],
  item: T,
  identifier: keyof T
): T[] => array.filter((element) => element[identifier] !== item[identifier]);

/**
 * Group items of an array by key
 * @param array
 * @param key
 * @param defaultKey Default key for items without key
 */
export function groupBy<T extends {}>(
  array: T[],
  key: keyof T,
  defaultKey?: string
): { [key: string]: T[] } {
  return array.reduce((groups, item) => {
    const group: string = (item[key] as unknown as string) ?? defaultKey;
    groups[group] = groups[group] ?? [];
    groups[group].push(item);
    return groups;
  }, {} as { [key: string]: T[] });
}

/**
 * Sort an array of object by key
 */
export function sortBy<T extends {}>(
  array: T[],
  key: keyof T,
  direction: "asc" | "desc" = "asc"
): T[] {
  return array.sort((a, b) => compare(a, b, key, direction));
}

/**
 * Compare to object for sorting
 */
export function compare<T extends {}>(
  firstItem: T,
  secondItem: T,
  key: keyof T,
  direction: "asc" | "desc" = "asc"
): -1 | 0 | 1 {
  if (firstItem[key] < secondItem[key]) {
    return direction === "asc" ? -1 : 1;
  }
  if (firstItem[key] > secondItem[key]) {
    return direction === "asc" ? 1 : -1;
  }
  return 0;
}

/**
 * Chunk an array into smaller arrays
 * @param array Array to chunk
 * @param chunkSize Size of each chunk
 */
export function chunk<T>(array: T[], chunkSize: number): T[][] {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}
