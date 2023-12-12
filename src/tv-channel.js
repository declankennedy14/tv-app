// import stuff
import { LitElement, html, css } from 'lit';

export class TvChannel extends LitElement {
  // defaults
  constructor() {
    super();
    this.title = '';
    this.video = '';
    this.presenter = '';
    this.image = '';
  }
  // convention I enjoy using to define the tag's name
  static get tag() {
    return 'tv-channel';
  }
  // LitElement convention so we update render() when values change
  static get properties() {
    return {
      title: { type: String },
      video: { type: String },
      presenter: { type: String },
      timecode: { type: Number },
      image: { type: String },
      index: { type: Number },
      active: { type: Boolean , reflect: true }
    };
  }
  static get styles() {
    return css`
      :host([active]) {
        background-color: #c76363ec
      }
      :host {
        display: block;
        padding: 10px;
        margin-top: 8px;
        margin-bottom: 8px;
        background-color: #EEEE;
        border-radius: 8px;
        transition: background-color ease;
      }
      .wrapper {
        padding-top: 30px;
        padding-left: 5px;
        padding-right: 5px;
        padding-bottom: 30px;
        background-color: #EEEE;
        background-size: cover;
        border-radius: 8px;
      }
      @media screen and (max-width: 800px) {
        :host {
          display: block;
          padding: 10px;
          margin-top: 0px;
          margin-bottom: 8px;
          background-color: #EEEE;
          border-radius: 8px;
          transition: background-color ease;
      }
        .wrapper {
        padding-top: 0px;
        padding-bottom: 10px;
        padding-right: 5px;
        background-color: #EEEE;
        background-size: cover;
        border-radius: 8px;
      }
      }
    `;
  }
  render() {
    return html`
      <div class="wrapper" style="background-image:url(${this.image});">
        <h3>${this.title}</h3>
        <h3>${this.video}</h3>
        <h4>${this.presenter}</h4>
        <slot></slot>
      </div>  
      `;
  }
}
customElements.define(TvChannel.tag, TvChannel);
