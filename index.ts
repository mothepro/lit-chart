import { LitElement, customElement, css, svg, property } from 'lit-element'

type Data = number[]

@customElement('lit-chart')
export default class extends LitElement {

  @property({ type: Number })
  width = 0

  @property({ type: Number })
  height = 0

  @property({ type: Array })
  data: Data[] = []

  @property({ type: Number, attribute: 'max-value' })
  givenMaxValue?: number

  @property({ type: Number, attribute: 'min-value' })
  givenMinValue?: number

  /**
   * This is needed since <circle> doesn't support `r` property in CSS
   * @see https://www.w3.org/TR/SVG/styling.html#SVGStylingProperties
   */
  // @property({ type: Number, attribute: 'circle-radius' })
  // circleRadius?: number

  // TODO: Is it worth to memoize this using the `updated` method?
  get maxValue() {
    return this.givenMaxValue ?? Math.max(...this.data.map(x => Math.max(...x)))
  }

  // TODO: Is it worth to memoize this using the `updated` method?
  get minValue() {
    return this.givenMinValue ?? Math.min(...this.data.map(x => Math.min(...x)))
  }

  // TODO: Is it worth to memoize this using the `updated` method?
  get stepSize() {
    return this.width / (Math.max(1, ...this.data.map(data => data.length)) - 1)
  }

  static styles = css`
  :host {
    display: inline-block;
  }
  :host([hidden]) {
    display: none;
  }
  `

  dataToPoint = (y: number, x: number) => [
    x * this.stepSize,
    this.height - this.height * ((y - this.minValue) / this.maxValue)
  ] as const

  readonly render = () => svg`
  <svg
    viewBox="0 0 ${this.width} ${this.height}"
    width=${this.width}
    height=${this.height}
    overflow=visible
  >
    ${this.data.map((data: Data, index: number) => svg`
      <polyline
        fill="none"
        part="line for-${index}"
        points=${data.map(this.dataToPoint).join(' ')}
      />
      ${data.map(this.dataToPoint).map(([x, y]) => svg`
        <circle
          part="circle for-${index}"
          cx=${x}
          cy=${y}
        />`)}
    `)}
  </svg>
  `
}
