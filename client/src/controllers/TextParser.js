import React from 'react';
import ReactHTMLParser from 'react-html-parser';

class TextParser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweet: props.tweet,
            fulltext: props.tweet.full_text,
            loading: true
        }
        this.handleHashtags = this.handleHashtags.bind(this);
        this.handleURLS = this.handleURLS.bind(this);
        this.handleMentions = this.handleMentions.bind(this);
        this.handleMedia = this.handleMedia.bind(this);
    }

    async componentDidMount() {
        if (this.state.tweet.entities.hashtags.length > 0) {
            await this.handleHashtags();
        }
        if (this.state.tweet.entities.urls.length > 0) {
            await this.handleURLS();
        }
        if (this.state.tweet.entities.user_mentions.length > 0) {
            await this.handleMentions();
        }
        if (this.state.tweet.entities.media != null) {
            await this.handleMedia();
        }
        await this.setState({
            loading: false
        })
    }

    async handleHashtags() {
        for (let hashtag of this.state.tweet.entities.hashtags) {
            console.log("hashtag");
            const full_text = this.state.tweet.full_text.replace(`#${hashtag.text}`,
                `<a href="https://twitter.com/hashtag/${hashtag.text}?src=hashtag_click" target="_blank">#${hashtag.text}</a>`);
            await this.setState({
                fulltext: full_text
            });
        }
    }

    async handleURLS() {
        for (let url of this.state.tweet.entities.urls) {
            const full_text = this.state.tweet.full_text.replace(`${url.url}`,
                `<a href="${url.url}" target="_blank">${url.display_url}</a>`);
            await this.setState({
                fulltext: full_text
            });
        }
    }

    async handleMentions() {
        for (let mentions of this.state.tweet.entities.user_mentions) {
            const full_text = this.state.fulltext.replace(`@${mentions.screen_name}`,
                `<a href="https://twitter.com/${mentions.screen_name}" target="_blank">@${mentions.screen_name}</a>`);
            await this.setState({
                fulltext: full_text
            });
        }
    }

    async handleMedia() {
        for (let media of this.state.tweet.entities.media) {
            const full_text = this.state.fulltext.replace(`${media.url}`,
                `<a href="${media.media_url_https}" target="_blank">${media.media_url_https}</a>`);
            console.log(full_text);
            console.log(media.media_url_https);
            await this.setState({
                fulltext: full_text
            });
        };
    }

    render() {
        return (
            <div>
                { ReactHTMLParser(this.state.fulltext)}
            </div>
        )
    }

}
export default TextParser;