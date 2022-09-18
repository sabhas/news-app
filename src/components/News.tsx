import { useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import NewsItem from "./NewsItem"
import { useLoading } from "../hooks"

const News = () => {
  const { Loading, setIsLoading } = useLoading()
  const [articles, setArticles] = useState<any>([])

  useEffect(() => {
    const url = `${process.env.REACT_APP_NEWS_API_URL}?apiKey=${process.env.REACT_APP_NEWS_API_KEY}&country=us`
    fetch(url)
      .then((data) => data.json())
      .then((data) => setArticles(data.articles))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [setIsLoading])

  return (
    <Container>
      <h3>Top Headlines</h3>
      <Loading />
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
    </Container>
  )
}

export default News
