import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import "../FunctionalComponents/style.css" 

import NewsItem from './NewsItem'

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            totalResults: 0,
            articles: [],
            page: 1
        }
    }

    async getApiData() {
        let response = await fetch(`https://newsapi.org/v2/everything?q=${this.props.search ? this.props.search : this.props.q}&pageSize=24&page=1&sortBy=publishedAt&language=${this.props.language}&apiKey=c8c6edbb39054166a40476396ecda921`)
        response = await response.json()
        this.setState({
            totalResults: response.totalResults,
            articles: response.articles.filter((x) => x.title !== "[Removed]")
        })
    }

    fetchData = async () => {
        this.setState({ page: this.state.page + 1 })
        let response = await fetch(`https://newsapi.org/v2/everything?q=${this.props.search ? this.props.search : this.props.q}&pageSize=24&page=${this.state.page}&sortBy=publishedAt&language=${this.props.language}&apiKey=c8c6edbb39054166a40476396ecda921`)
        response = await response.json()
        if (response.articles) {
            this.setState({
                articles: this.state.articles.concat(response.articles.filter((x) => x.title !== "[Removed"))
            })
        }
    }
    componentDidMount() {
        this.getApiData()
    }
    componentDidUpdate(oldProps) {
        if (oldProps !== this.props)
            this.getApiData()
    }
    render() {
        return (
            <div className="container-fluid my-2">
                <h5 className='background text-center text-light p-2 my-2 text-capitalize'>{this.props.search ? this.props.search : this.props.q} News Articles</h5>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<div className='my-3 text-center'>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>}
                >
                    <div className="row">
                        {
                            this.state.articles?.map((item, index) => {
                                return <NewsItem
                                    key={index}
                                    source={item.source.name}
                                    title={item.title}
                                    description={item.description}
                                    url={item.url}
                                    pic={item.urlToImage}
                                    date={item.publishedAt}
                                />
                            })
                        }
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}
