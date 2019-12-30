# [Lit Chart](//mothepro.github.io/lit-chart)

> Simple Line Charts made with pure SVGs

## Install

`yarn add lit-chart`

## Attributes

Attribute | Type | Description
----------|------|------------
`width` | `number` | Width, in pixels, of the SVG
`height` | `number` | Height, in pixels, of the SVG
`data` | `number[][]` | Data values to display in the chart. Out array contains the data sets. Inner array contains points to chart
`max-value` | `number` | Max value to display on chart. *Defaults to the maximum value given in `data`*.
`min-value` | `number` | Min value to display on chart. *Defaults to the minimum value given in `data`*.

## How to Use

```html
<script type="module" src="//unpkg.com/@mothepro/lit-chart/dist/esm/index.js"></script>

<lit-chart 
  width=600
  height=300
  min-value=0
  max-value=100
  data="[
    [6, 99, 21, 62, 89, 97, 16, 79, 60, 95],
    [5, 6, 100, 60, 50, 45, 50, 78, 99, 10]
  ]"
></lit-chart>
```

## Styling

```css
/** Styles all the lines */
lit-chart::part(line) {
  stroke-width: 2px;
}

/** Styles all the points */
lit-chart::part(circle) {
  r: 1;
  stroke-width: 2px;
}

/** Styles all the points on hover */
lit-chart::part(circle):hover {
  stroke-width: 15px;
}

/** Styles all the data for the first set */
lit-chart::part(for-0) {
  stroke: #0074d9;
}

/** Styles all the data for the second set */
lit-chart::part(for-1) {
  stroke: red;
}
```

### TODO

+ RTL support
