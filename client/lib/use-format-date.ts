// This doesn't use useMemo or useCallback because we want it
// to be cached across all hook instances instead of just a single instance.
const cachedFormatters = new Map<string, Intl.DateTimeFormat["format"]>();

export function useFormatDate(options: Intl.DateTimeFormatOptions) {
  const optionsKey = JSON.stringify(options);

  if (cachedFormatters.get(optionsKey) == null) {
    cachedFormatters.set(
      optionsKey,
      new Intl.DateTimeFormat("en", options).format
    );
  }

  const formatter = cachedFormatters.get(optionsKey);

  if (formatter == null) {
    throw new Error(
      `Something went wrong when creating or fetching date formatter with options: ${optionsKey}`
    );
  }

  return formatter;
}
