import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  ReactNode,
} from "react"

import { Country, Source } from "../types"

interface AppContextProps {
  country?: Country
  setCountry: Dispatch<SetStateAction<Country | undefined>>
  category?: string
  setCategory: Dispatch<SetStateAction<string | undefined>>
  sources: Source[]
  selectedSources: Source[]
  setSelectedSources: Dispatch<SetStateAction<Source[]>>
}

export const AppContext = createContext<AppContextProps>(undefined!)

const AppContextProvider = (props: { children: ReactNode }) => {
  const { children } = props
  const [country, setCountry] = useState<Country | undefined>({
    name: "United States",
    id: "us",
  })
  const [category, setCategory] = useState<string | undefined>()
  const [sources, setSources] = useState<Source[]>([])
  const [selectedSources, setSelectedSources] = useState<Source[]>([])

  useEffect(() => {
    setSelectedSources([])

    const url = `${process.env.REACT_APP_NEWS_API_URL}/sources?apiKey=${
      process.env.REACT_APP_NEWS_API_KEY
    }&country=${country ? country.id : ""}&category=${category ?? ""}`

    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        setSources(data.sources)
      })
      .catch((err) => console.log(err))
  }, [country, category])

  return (
    <AppContext.Provider
      value={{
        country,
        setCountry,
        category,
        setCategory,
        sources,
        selectedSources,
        setSelectedSources,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
