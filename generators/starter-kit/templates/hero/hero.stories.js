import "./hero.scss";
import HeroTemplate from "./hero.twig";

export default {
  title: "General/Hero",
  argTypes: {
    hero: {
      description: "Define the hero object",
      control: "object",
      type: {
        required: true,
      },
    },
  },
};

export const Hero = HeroTemplate.bind({});
Hero.args = {
  "hero": {
    "media": {
      "image": "<img src='https://source.unsplash.com/FIKD9t5_5zQ/1400x787' alt='test image' />"
    },
    "eyebrow": {
      "text": "Subhead Could Be Here",
      "modifier": " hero__eyebrow"
    },
    "heading": {
      "title": "Title Lorem Ipsum Dolor",
      "level": "2",
      "modifier": "hero__heading"
    },
    "body": {
      "body_text": "<p>Some sites need a tagline mauris ac dui sit amet sem facilisis finibus vitae et mi.</p>",
      "modifier": "hero__body"
    },
    "hero_body": "Some sites need a tagline mauris ac dui sit amet sem facilisis finibus vitae et mi.",
    "button": {
      "text": "Learn more",
      "url": "#"
    }
  }
};
