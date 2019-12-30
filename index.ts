import { LitElement, customElement, css, svg, property } from 'lit-element'

type Data = number[]
type Point = [number, number]

@customElement('lit-chart')
export default class extends LitElement {

  @property({type: Number})
  width = 0
  
  @property({ type: Number })
  height = 0
  
  @property({ type: Array })
  data: Data[] = []

  @property({type: Array})
  colors = ["#0074d9"]

  @property({ type: Number, attribute: 'line-width' })
  lineWidth = 2

  @property({ type: Number, attribute: 'max-value' })
  givenMaxValue?: number

  @property({ type: Number, attribute: 'min-value' })
  givenMinValue?: number

  // TODO: Is it worth to memoize this using the `updated` method?
  get maxValue() {
    return this.givenMaxValue ?? Math.max(...this.data.map(x => Math.max(...x)))
  }
  
  // TODO: Is it worth to memoize this using the `updated` method?
  get minValue() {
    return this.givenMinValue ?? Math.min(...this.data.map(x => Math.min(...x)))
  }

  static styles = css`
  :host {
    display: inline-block;
  }
  `

  makeLine = (data: Data, index: number) => {
    const points: Point[] = data.map((y, x) => [
      x * this.width / (data.length - 1),
      this.height - this.height * ((y - this.minValue) / this.maxValue)
    ])
    return svg`
    <polyline
      fill="none"
      stroke=${this.colors[index % this.colors.length]}
      stroke-width=${this.lineWidth}
      points=${points.join(' ')}
    />`
  }

  readonly render = () => svg`
  <svg viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}>
    ${this.data.map(this.makeLine)}
  </svg>
  `
}
