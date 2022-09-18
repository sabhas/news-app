import React from "react"

const NewsItem = (props: any) => {
  return (
    <div className="my-3">
      <div className="card">
        <img className="card-img-top" src={props.imageURL} alt="Card cap" />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
          <a
            href={props.newsURL}
            target="_blank"
            className="btn btn-sm btn-primary"
            rel="noreferrer"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem
