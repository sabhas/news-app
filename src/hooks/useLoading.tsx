import { useState } from "react"
import loadingGIF from "../assets/images/Infinity-1s-200px.gif"

const LoadingGif = () => (
  <div className="text-center">
    <img src={loadingGIF} alt="loading" />
  </div>
)

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(true)

  const Loading = () => (isLoading ? <LoadingGif /> : null)

  return { Loading, setIsLoading }
}
