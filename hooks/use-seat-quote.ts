import { schoolProQuoteKey } from "@/api/keys";
import api from "@/api/base";
import { SeatQuote } from "@/types/billing";
import useSWR from "swr";
import { useEffect, useState } from "react";

const fetchQuote = ([url, quantity]: [string, number]) =>
  api.get(url, { params: { quantity } }).then((res) => res.data.data);

/**
 * School Pro price for an order. The server is the source of truth; the input
 * is debounced because the default rate limit is 100 requests a minute.
 */
export default function useSeatQuote(quantity: number, enabled = true) {
  const [debounced, setDebounced] = useState(quantity);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(quantity), 250);
    return () => clearTimeout(t);
  }, [quantity]);
  const valid = Number.isInteger(debounced) && debounced > 0;
  const { data, error, isLoading, isValidating } = useSWR<SeatQuote>(
    enabled && valid ? [schoolProQuoteKey, debounced] : null,
    fetchQuote,
    { keepPreviousData: true, revalidateOnFocus: false, shouldRetryOnError: false },
  );

  return {
    quote: data ?? null,
    isLoading,
    /** the shown quote is for a different quantity than the input */
    isStale: isValidating || (data ? data.quantity !== quantity : false),
    isError: !!error,
  };
}
