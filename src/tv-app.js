// import stuff
import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import "./tv-channel.js";
import "@lrnwebcomponents/video-player/video-player.js";

export class TvApp extends LitElement {
  // defaults
  constructor() {
    super();
    this.name = '';
    this.source = new URL('../assets/channels.json', import.meta.url).href;
    this.listings = [];
  }
  // convention I enjoy using to define the tag's name
  static get tag() {
    return 'tv-app';
  }
  // LitElement convention so we update render() when values change
  static get properties() {
    return {
      name: { type: String },
      source: { type: String },
      listings: { type: Array },
      channels: { type: Object },
      active: { type: String },
    };
  }
  // LitElement convention for applying styles JUST to our element
  static get styles() {
    return [
      css`
      :host {

      }
      .grid-container{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
      }
      .left-item{
        grid-column: 1;
        margin-top: 50px;
        margin-right: 50px;
        width: 900px;
      }
      .right-item{
        grid-column: 2;
        width: 300px;
        font-size: .94rem;
        margin-top: 32px;
        text-align: center;
        -webkit-overflow-scrolling: touch;
        overflow-y: auto;
        height: 82.5vh
      }
      .tv-data {
        width: 900px;
      }
      .slideclicker {
        display: flex;
        flex-direction: row;
        text-align: center;
        gap: 500px;
        margin-top: 30px;
        margin-bottom: 20px;
      }
      .previous-slide {
        font-size: 20px;
        width: 200px;
        height: 50px;
      }
      .next-slide {
        font-size: 20px;
        width: 200px;
        height: 50px;
      }

      `
    ];
  }
  // LitElement rendering template of your element
  render() {
    return html`
    <div class="grid-container">
      <div class="grid-item">
        <div class="left-item">
          <video-player source="https://www.youtube.com/watch?v=ORLzURr2q-Q&ab_channel=WatchMojo.com" accent-color="red" dark track="https://haxtheweb.org/files/HAXshort.vtt"></video-player> 
          <tv-channel title="WatchMojo.com" presenter="WatchMojo">
            Top 10 Best Hockey Players of All Time
          </tv-channel> 
        </div>  
      </div>
      <div class="right-item">
      <h2>${this.name}</h2>
      ${
        this.listings.map(
          (item, index) => html`
            <tv-channel 
              title="${item.title}"
              presenter="${item.metadata.author}"
              @click="${this.itemClick}"
              timecode= "${item.metadata.timecode}"
            >
            </tv-channel> 
          `
        )
      }
    
      </div>
        <!-- dialog -->
    <sl-dialog label="Dialog" class="dialog">
        Count Number 
    <sl-button slot="footer" variant="primary" @click="${this.closeDialog}">Close</sl-button>
    </sl-dialog> 
    </div>
    
    <div class="slideclicker">
      <button class = "previous-slide"> Previous Slide</button>
      <button class = "next-slide"> Next Slide</button>
    </div>
    `;
  }

  closeDialog(e) {
    const dialog = this.shadowRoot.querySelector('.dialog');
    dialog.hide();
  }

  itemClick(e) {
    console.log(e.target);
    // this will give you the current time so that you can progress what's active based on it playing
    this.shadowRoot.querySelector('video-player').shadowRoot.querySelector("a11y-media-player").media.currentTime
    // this forces the video to play
    this.shadowRoot.querySelector('video-player').shadowRoot.querySelector('a11y-media-player').play()
    // this forces the video to jump to this point in the video via SECONDS
    this.shadowRoot.querySelector('video-player').shadowRoot.querySelector('a11y-media-player').seek(e.target.timecode)


  }

  // LitElement life cycle for when any property changes
  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    changedProperties.forEach((oldValue, propName) => {
      if (propName === "source" && this[propName]) {
        this.updateSourceData(this[propName]);
      }
    });
  }

  async updateSourceData(source) {
    await fetch(source).then((resp) => resp.ok ? resp.json() : []).then((responseData) => {
      if (responseData.status === 200 && responseData.data.items && responseData.data.items.length > 0) {
        this.listings = [...responseData.data.items];
      }
    });
  }
}
// tell the browser about our tag and class it should run when it sees it
customElements.define(TvApp.tag, TvApp);
