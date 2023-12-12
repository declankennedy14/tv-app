import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import "./tv-channel.js";
import "@lrnwebcomponents/video-player/video-player.js";

export class TvApp extends LitElement {
  constructor() {
    super();
    this.name = '';
    this.source = new URL('../assets/channels.json', import.meta.url).href;
    this.listings = [];
    this.activeIndex = 0;
  }
  static get tag() {
    return 'tv-app';
  }
  static get properties() {
    return {
      name: { type: String },
      source: { type: String },
      listings: { type: Array },
      channels: { type: Object },
      active: {type: String },
      activeIndex: { type: String },
    };
  }
  static get styles() {
    return [
      css`
      :host {
       display: grid;
       margin: 16px;
       padding: 16px;
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
        font-size: 1.3rem;
        color: white;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        margin-top: 32px;
        text-align: center;
        -webkit-overflow-scrolling: touch;
        overflow-y: auto;
        height: 82.5vh;
      }
      .tv-data {
        width: 900px;
      }
      .description-box {
        padding-top: 30px;
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
      @media screen and (max-width: 800px) {
        .grid-container{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
      }
      .left-item{
        grid-column: 1;
        margin-top: 50px;
        margin-right: 50px;
        width: 280px;
      }
      .right-item{
        grid-column: 2;
        width: 150px;
        font-size: 1.3rem;
        color: white;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        margin-top: 32px;
        text-align: center;
        -webkit-overflow-scrolling: touch;
        overflow-y: auto;
        height: 72vh;
      }
      .tv-data {
        width: 280px;
      }
      .description-box {
        padding-top: 30px;
      }
      .slideclicker {
        display: flex;
        flex-direction: row;
        text-align: center;
        gap: 80px;
        margin-top: 30px;
        margin-bottom: 20px;
      }
      .previous-slide {
        font-size: 20px;
        width: 100px;
        height: 50px;
      }
      .next-slide {
        font-size: 20px;
        width: 100px;
        height: 50px;
      }
      .listing {
        height: 120px;
      }
      }
      `
    ];
  }
  render() {
    return html`
    <div class="grid-container">
      <div class="grid-item">
        <div class="left-item">
          <video-player class="tv-data" source="https://www.youtube.com/watch?v=ORLzURr2q-Q&ab_channel=WatchMojo.com" accent-color="red" dark track="https://haxtheweb.org/files/HAXshort.vtt"></video-player> 
          <tv-channel title="WatchMojo.com" presenter="WatchMojo">
            Top 10 Best Hockey Players of All Time 
            <div class="description-box">
              ${this.listings.length > 0 ? this.listings[this.activeIndex].description : ''}
            </div>
          </tv-channel>
          
        </div>  
      </div>
      <div class="right-item">
      <h2>${this.name}</h2>
     ${
       this.listings.map(
         (item, index) => html`
           <tv-channel
            ?active="${index === this.activeIndex}"
            index="${index}"
            title="${item.title}"
            presenter="${item.metadata.author}"
            description = "${item.description}"
            @click="${this.itemClick}"
            class="listing"
            timecode = "${item.metadata.timecode}"
            image = "${item.metadata.image}"
           >
           </tv-channel>
         `
       )
     }
     </div>
       <sl-dialog label="Dialog" class="dialog">
         Section
       <sl-button slot="footer" variant="primary" @click="${this.closeDialog}">Close</sl-button>
       </sl-dialog>
     </div>
   <div class="slideclicker">
     <button class="previous-slide" @click="${this.prevSlide}">Previous Slide</button>
     <button class="next-slide" @click="${this.nextSlide}">Next Slide</button>
   </div>
   `;
 }


 closeDialog(e) {
   const dialog = this.shadowRoot.querySelector('.dialog');
   dialog.hide();
 }


 itemClick(e) {
   console.log(e.target);
   this.activeIndex=e.target.index;
    this.shadowRoot.querySelector('video-player').shadowRoot.querySelector("a11y-media-player").media.currentTime
    this.shadowRoot.querySelector('video-player').shadowRoot.querySelector('a11y-media-player').play()
    this.shadowRoot.querySelector('video-player').shadowRoot.querySelector('a11y-media-player').seek(e.target.timecode)
  }

 prevSlide() {
   this.activeIndex = Math.max(0, this.activeIndex - 1);
   this.shadowRoot.querySelector('video-player').shadowRoot.querySelector('a11y-media-player').seek(activeChannel.timecode);
 }


 nextSlide() {
   this.activeIndex = Math.min(this.listings.length - 1, this.activeIndex + 1);
   this.shadowRoot.querySelector('video-player').shadowRoot.querySelector('a11y-media-player').seek(activeChannel.timecode);
 }

 updated(changedProperties) {
   if (super.updated) {
     super.updated(changedProperties);
   }
   changedProperties.forEach((oldValue, propName) => {
     if (propName === "source" && this[propName]) {
       this.updateSourceData(this[propName]);
     }

     if(propName === "activeIndex"){
       console.log(this.shadowRoot.querySelectorAll("tv-channel"));
       console.log(this.activeIndex)
      
       var activeChannel = this.shadowRoot.querySelector("tv-channel[index = '" + this.activeIndex + "' ] ");
      
       console.log(activeChannel);
     }
   });
 }

 connectedCallback() {
  super.connectedCallback();
  
  setInterval(() => {
    if(this.shadowRoot.querySelector('video-player').shadowRoot.querySelector('a11y-media-player')){
      const currentTime = this.shadowRoot.querySelector('video-player').shadowRoot.querySelector('a11y-media-player').media.currentTime;
      var newIndex = 0;
      this.listings.map((item, index)=> {
        if(item.metadata.timecode < currentTime) {
          newIndex = index;
        }
      });
      this.activeIndex = newIndex;
    }
},1000);
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
