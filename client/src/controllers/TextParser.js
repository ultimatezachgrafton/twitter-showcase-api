import React from 'react';
import ReactHTMLParser from 'react-html-parser';

class TextParser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweet: props.tweet,
            fulltext: props.tweet.full_text
        }
    }

    componentDidMount() {
        if (this.state.tweet.entities.hashtags.length > 0) {
            for (let hashtag of this.state.tweet.entities.hashtags) {
                const full_text = this.state.tweet.full_text.replace(`#${hashtag.text}`,
                    `<a href="https://twitter.com/hashtag/${hashtag.text}?src=hashtag_click" target="_blank">#${hashtag.text}</a>`);
                this.setState({
                    fulltext: full_text
                });
            }
        }

        if (this.state.tweet.entities.urls.length > 0) {
            for (let url of this.state.tweet.entities.urls) {
                const full_text = this.state.tweet.full_text.replace(`${url.url}`,
                    `<a href="${url.url}" target= "_blank">${url.display_url}</a>`);
                this.setState({
                    fulltext: full_text
                });
            }
        }

        if (this.state.tweet.entities.user_mentions.length > 0) {
            for (let mentions of this.state.tweet.entities.user_mentions) {
                const full_text = this.state.fulltext.replace(`@${mentions.screen_name}`,
                    `<a href="https://twitter.com/${mentions.screen_name}" target="_blank">@${mentions.screen_name}</a>`);
                this.setState({
                    fulltext: full_text
                });
            }
        }
    }

    render() {
        return (
            <div>
                {ReactHTMLParser(this.state.fulltext)}
            </div>
        )
    }

    // alt: use indices from data
    // if hashtag used, link to hashtag on twitter

}
export default TextParser;