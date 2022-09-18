import { useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import Pagination from "@mui/material/Pagination"
import NewsItem from "./NewsItem"
import Loading from "./Loading"

const PAGE_SIZE = 9

const News = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [articles, setArticles] = useState<any>([])
  const [totalArticles, setTotalArticles] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    window.scrollTo(0, 0) //scrolls to top.
    setIsLoading(true)

    const url = `${process.env.REACT_APP_NEWS_API_URL}?apiKey=${
      process.env.REACT_APP_NEWS_API_KEY
    }&country=us&page=${page + 1}&pageSize=${PAGE_SIZE}`

    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        setArticles(data.articles)
        setTotalArticles(data.totalResults)
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [setIsLoading, page])

  return (
    <Container>
      <h3 className="text-center">Top Headlines</h3>
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
        sx={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}
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
