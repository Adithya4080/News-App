import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';

export class News extends Component {

    static defaultProps = {
        country : 'in',
        pageSize : 8,
        category : 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pages: PropTypes.number,
        category : PropTypes.string
    }

    capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        // console.log("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=f23a37bf13214e68b22597020ccc808c&page=1&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
    }

    handlePrevClick = async ()=>{
        console.log("Prev");

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=f23a37bf13214e68b22597020ccc808c&page=${this.state.page - 1} &pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })

    }

    handleNextClick = async ()=>{
        console.log("next");

        if (this.state.page + 1 > Math.ceil(this.props.pageSize)){

        }
        else{
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=f23a37bf13214e68b22597020ccc808c&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        }
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{margin: '40px 0px'}}>NewsMonkey - Top Headlines on {this.capitalizeFirstLetter(this.props.category)}</h1>
                <div className='row'>
                    {this.state.articles.map((element)=>{
                        return  <div className='col-md-4' key={element.url}>
                                    <NewsItem  title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} /> 
                                </div>
                    })}           
                </div>
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News