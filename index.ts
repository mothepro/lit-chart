import { LitElement, customElement, css, svg, property } from 'lit-element'

const def = new Array(15)
for (let i = 0; i < def.length; i++)
  def[i] = 10 + Math.floor(Math.random() * 100)

@customElement('lit-chart')
export default class extends LitElement {

  @property({type: Number})
  width = 0
  
  @property({ type: Number })
  height = 0
  
  
  static styles = css`
  :host {
    display: inline-block;
  }
  `

  readonly render = () => svg`
  <svg viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}></svg>
  `
}
