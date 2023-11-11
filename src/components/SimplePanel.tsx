import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2, useTheme2 } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme2();
  const styles = useStyles2(getStyles);
  
  let color = theme.visualization.getColorByName(options.color);
  const radii = data.series
  .map((series) => series.fields.find((field) => field.type === 'number'))
  .map((field) => field?.values.get(field.values.length - 1));
  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
    <svg
  className={styles.svg}
  width={width}
  height={height}
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  viewBox={`0 -${height / 2} ${width} ${height}`}
>
  <g fill={color}>
    {radii.map((radius, index) => {
      const step = width / radii.length;
      return <circle r={radius} transform={`translate(${index * step + step / 2}, 0)`} />;
    })}
  </g>
</svg>

      <div className={styles.textBox}>
        {options.showSeriesCount && <div>Number of series: {data.series.length}</div>}
        <div>Text option value: {options.text}</div>
      </div>
    </div>
  );
};
