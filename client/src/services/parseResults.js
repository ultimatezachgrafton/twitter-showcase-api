export default async function parseResults(results) {
    let tweets = results;
    let text = '';
    let iteration = 0;
    let last_id = '';

    if (tweets.statuses !== undefined) {
        tweets = tweets.statuses;
    }
    for (let tweet of tweets) {
        last_id = tweet.id_str;
        if (tweet.retweeted_status !== null) {

            // TODO: needs to display content instead of user if no user

            let searchedUserName = tweet.user.name;
            tweets[iteration] = tweet.retweeted_status;
            tweets[iteration].retweet = true;
            tweets[iteration].searchedUserName = searchedUserName;
            tweet = tweet.retweeted_status;
        }

        tweets[iteration].timestamp = convertTime(tweet.created_at);
        text = tweet.full_text;
        if (tweet.entities && tweet.entities !== null) {
            if (tweet.entities.hashtags && tweet.entities.hashtags !== null) {
                for (let hashtag of tweet.entities.hashtags) {
                    text = text.replace(`#${hashtag.text}`,
                        `<a href="https://twitter.com/hashtag/${hashtag.text}?src=hashtag_click">#${hashtag.text}</a>`);
                    tweets[iteration].full_text = text;
                }
            }
            if (tweet.entities.urls && tweet.entities.urls !== null) {
                for (let urls of tweet.entities.urls) {
                    text = text.replace(`${urls.url}`, `<a href="${urls.expanded_url}">${urls.display_url}</a>`);
                    tweets[iteration].full_text = text;
                }
            }
            if (tweet.entities.user_mentions && tweet.entities.user_mentions !== null) {
                for (let user_mentions of tweet.entities.user_mentions) {
                    let screenNameCaseInsensitive = new RegExp(`${user_mentions.screen_name}`, 'ig');
                    text = text.replace(screenNameCaseInsensitive, `${user_mentions.screen_name}`);
                    text = text.replace(`@${user_mentions.screen_name}`,
                        `<a href="https://twitter.com/${user_mentions.screen_name}">@${user_mentions.screen_name}</a>`);
                    tweets[iteration].full_text = text;
                }
            }
        } if (tweet.extended_entities && tweet.extended_entities !== null) {
            if (tweet.extended_entities.media && tweet.extended_entities.media !== null) {
                for (let media of tweet.extended_entities.media) {
                    let url = '';
                    let format = '';
                    let video = '';
                    let videoContentType = '';
                    let mediaText = '';
                    switch (media.type) {
                        case 'photo':
                            url = (media.media_url_https).slice(0, -4);
                            format = (media.media_url_https).slice(-3);
                            text = text.replace(`${media.url}`, '');
                            tweets[iteration].full_text = text;
                            mediaText = `<div class="media-photo-div"><Image class="media-photo" 
                                            src="${url}?format=${format}&name=small" fluid/></div>`;
                            tweets[iteration].media_text = mediaText;
                            break;
                        case 'video':
                            for (let variant of media.video_info.variants) {
                                let bitrate = 0;
                                if (variant.content_type === 'video/mp4') {
                                    if (variant.bitrate > bitrate) {
                                        bitrate = variant.bitrate;
                                        video = variant.url;
                                        videoContentType = variant.content_type;
                                    }
                                }
                            }
                            url = (media.media_url_https).slice(0, -4);
                            format = (media.media_url_https).slice(-3);
                            text = text.replace(`${media.url}`, '');
                            tweets[iteration].full_text = text;
                            mediaText = `<div class="media-video-div"><video class="media-video" 
                                            preload="none" playsinline controls poster="${url}?format=${format}&name=small">
                                            <source src="${video}" type="${videoContentType}"></video></div>`;
                            tweets[iteration].media_text = mediaText;
                            break;
                        case 'animated_gif':
                            text = text.replace(`${media.url}`, '');
                            tweets[iteration].full_text = text;
                            mediaText = `<div class="media-gif-div"><video class="media-gif" autoplay loop 
                                            muted preload="auto" playsinline poster="${media.media_url_https}" 
                                            src="${media.video_info.variants[0].url}" type="${media.video_info.variants[0].content_type}"
                                            autoplay ></video></div>`;
                            tweets[iteration].media_text = mediaText;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        iteration++;
    }
    return [tweets, last_id];
}


function convertTime(textTime) {
    const tweetTime = new Date(textTime);
    const difference = new Date() - tweetTime;

    const seconds = Math.floor((difference / 1000).toFixed(0));
    const minutes = Math.floor((difference / (1000 * 60)).toFixed(0));
    const hours = Math.floor((difference / (1000 * 60 * 60)).toFixed(0));

    const month = tweetTime.toLocaleString('default', { month: 'short' });
    const day = tweetTime.toLocaleString('default', { day: 'numeric' });

    if (seconds < 60) {
        return seconds + "s";
    } else if (minutes < 60) {
        return minutes + "m";
    } else if (hours < 24) {
        return hours + "h";
    } else {
        return month + " " + day;
    }
}