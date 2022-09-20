import { Source } from "../types"

export const getCommaSeparatedString = (sources: Source[]) => {
  return sources.reduce(
    (prevResult, currentSource) =>
      `${prevResult}${!!prevResult ? "," : ""}${currentSource.id}`,
    ""
  )
}
