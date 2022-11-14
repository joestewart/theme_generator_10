import "./latest-news.scss";
import LatestNewsTemplate from "./latest-news.twig";

export default {
  title: "General/Latest News",
  argTypes: {
    heading: {
      description: "The title of the latest news component",
      control: "object",
    },
    items: {
      description: "Define the array of latest news items",
      control: "array",
      type: {
        required: true,
      },
    },
  },
};

export const LatestNews = LatestNewsTemplate.bind({});
LatestNews.args = {
  "heading": {
    "title": "Latest News",
    "heading_level": 2,
    "modifier": "latest-news__title"
  },
  "items": [
    {
      "card": {
        "modifier": "horizontal",
        "media": {
          "video": "",
          "image": "<img src='https://source.unsplash.com/PhYq704ffdA/640x360' alt='test image' />",
          "caption": ""
        },
        "eyebrow": {
          "text": "Optional eyebrow",
          "modifier": " card__eyebrow"
        },
        "heading": {
          "title": "Phasellus auctor, turpis",
          "heading_level": "2",
          "url": "#",
          "modifier": "card__title"
        },
        "subhead": {
          "title": "Optional Subhead Lorem Ipsum Dolor Sit Amet",
          "heading_level": "3",
          "modifier": "card__subhead",
          "url": ""
        },
        "summary_text": "This copy is optional, if nothing is entered nothing will display. Facit nulla in vulputate vulputate aliquam. Commodo esse habent tation nam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed orci lacus.",
        "link": {
          "url": "#",
          "text": "Optional Link"
        }
      }
    },
    {
      "card": {
        "modifier": "",
        "eyebrow": {
          "text": "Optional eyebrow",
          "modifier": " card__eyebrow"
        },
        "heading": {
          "title": "Phasellus auctor, turpis",
          "heading_level": "2",
          "url": "#",
          "modifier": "card__title"
        },
        "subhead": {
          "title": "Optional Subhead Lorem Ipsum Dolor Sit Amet",
          "heading_level": "3",
          "modifier": "card__subhead",
          "url": ""
        },
        "summary_text": "This copy is optional, if nothing is entered nothing will display. Facit nulla in vulputate vulputate aliquam. Commodo esse habent tation nam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed orci lacus.",
        "link": {
          "url": "#",
          "text": "Optional Link"
        }
      }
    },
    {
      "card": {
        "modifier": "",
        "eyebrow": {
          "text": "Optional eyebrow",
          "modifier": " card__eyebrow"
        },
        "heading": {
          "title": "Phasellus auctor, turpis",
          "heading_level": "2",
          "url": "#",
          "modifier": "card__title"
        },
        "subhead": {
          "title": "Optional Subhead Lorem Ipsum Dolor Sit Amet",
          "heading_level": "3",
          "modifier": "card__subhead",
          "url": ""
        },
        "summary_text": "This copy is optional, if nothing is entered nothing will display. Facit nulla in vulputate vulputate aliquam. Commodo esse habent tation nam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed orci lacus.",
        "link": {
          "url": "#",
          "text": "Optional Link"
        }
      }
    },
    {
      "card": {
        "modifier": "",
        "eyebrow": {
          "text": "Optional eyebrow",
          "modifier": " card__eyebrow"
        },
        "heading": {
          "title": "Phasellus auctor, turpis",
          "heading_level": "2",
          "url": "#",
          "modifier": "card__title"
        },
        "subhead": {
          "title": "Optional Subhead Lorem Ipsum Dolor Sit Amet",
          "heading_level": "3",
          "modifier": "card__subhead",
          "url": ""
        },
        "summary_text": "This copy is optional, if nothing is entered nothing will display. Facit nulla in vulputate vulputate aliquam. Commodo esse habent tation nam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed orci lacus.",
        "link": {
          "url": "#",
          "text": "Optional Link"
        }
      }
    }
  ]
};
