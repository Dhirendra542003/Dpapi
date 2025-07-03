import React, { Component } from 'react'
import "../FunctionalComponents/style.css" 

export default class NewsItem extends Component {
    render() {
        return (
            <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                <div className="card">
                    <img src={this.props.pic?this.props.pic:"/images/noimage.png"} height={160} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.title}</h5>
                        <div className='date-source'>
                            <p>{this.props.source}</p>
                            <p>{new Date(this.props.date).toLocaleDateString()}</p>
                        </div>
                        <p className="card-text">{this.props.description}</p>
                        <a href={this.props.url} className="btn btn-primary background w-100">Read Full Article</a>
                    </div>
                </div>
            </div>
        )
    }
}
