import { useEffect, useState, useContext } from "react"
import Container from "react-bootstrap/Container"
import Pagination from "@mui/material/Pagination"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import NewsItem from "./NewsItem"
import Loading from "./Loading"
import StyledBreadcrumb from "./StyledBreadcrumbs"
import { AppContext } from "../context/appContext"
import { getCommaSeparatedString } from "../utils/helper"

const PAGE_SIZE = 9

const News = () => {
  const { country, selectedSources, category } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(true)
  const [articles, setArticles] = useState<any>([])
  const [totalArticles, setTotalArticles] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    window.scrollTo(0, 0) //scrolls to top.
    setIsLoading(true)

    let url = `${process.env.REACT_APP_NEWS_API_URL}?apiKey=${
      process.env.REACT_APP_NEWS_API_KEY
    }&page=${page + 1}&pageSize=${PAGE_SIZE}`

    if (selectedSources.length > 0) {
      url = `${url}&sources=${getCommaSeparatedString(selectedSources)}`
    } else if (category) {
      url = `${url}&category=${category}`
    } else {
      url = `${url}&country=${country ? country.id : ""}`
    }

    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        setArticles(data.articles)
        setTotalArticles(data.totalResults)
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [setIsLoading, page, country, selectedSources, category])

  return (
    <Container>
      <h3 className="text-center" style={{ marginTop: "55px" }}>
        Top Headlines
      </h3>

      <Breadcrumbs aria-label="breadcrumb">
        {!category && selectedSources.length === 0 && country && (
          <StyledBreadcrumb label={country.name} />
        )}
        {category && <StyledBreadcrumb label={category} />}
        {selectedSources.map((source) => (
          <StyledBreadcrumb key={source.id} label={source.name} />
        ))}
      </Breadcrumbs>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="row">
          {articles.map((items: any, id: number) => (
            <div className="col-sm-12 col-md-6 col-lg-4" key={items.url}>
              <NewsItem
                title={items.title.slice(0, 45) + ".."}
                description={items.description?.slice(0, 85) + "..."}
                imageURL={items.urlToImage}
                newsURL={items.url}
              />
            </div>
          ))}
        </div>
      )}

      <Pagination
        sx={{ display: "flex", justifyContent: "center", margin: "15px 0" }}
        count={Math.floor(totalArticles / PAGE_SIZE)}
        onChange={(e, val) => setPage(val)}
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Container>
  )
}

export default News
