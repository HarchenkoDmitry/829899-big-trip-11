import Component from './absctract/component.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 55;

const renderChart = (ctx, labels, data, title, formatter) => {
  ctx.height = BAR_HEIGHT * labels.length;
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter,
        }
      },
      title: {
        display: true,
        text: title,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};


const createStatsTemplate = () => {
  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

export default class Stats extends Component {
  get template() {
    return createStatsTemplate();
  }

  _renderMoneyChart(points) {
    const moneyCtx = this.element.querySelector(`.statistics__chart--money`);
    const arrType = [];
    points.forEach((point) => {
      const typeName = point.type.name;
      const index = arrType.findIndex((type) => type.label === typeName);
      if (index !== -1) {
        arrType[index].price += point.price;
      } else {
        arrType.push({
          label: typeName,
          price: point.price,
        });
      }
    });

    arrType.sort((type1, type2) => {
      if (type1.price < type2.price) {
        return 1;
      } else if (type1.price > type2.price) {
        return -1;
      } else {
        return 0;
      }
    });

    const labels = arrType.map((type) => type.label);
    const data = arrType.map((type) => type.price);
    const formatter = (val) => `€ ${val}`;

    renderChart(moneyCtx, labels, data, `MONEY`, formatter);
  }

  _renderTransportChart(points) {
    const moneyCtx = this.element.querySelector(`.statistics__chart--transport`);
    const arrType = [];
    points.forEach((point) => {
      const typeName = point.type.name;
      const index = arrType.findIndex((type) => type.label === typeName);
      if (index !== -1) {
        arrType[index].count++;
      } else {
        arrType.push({
          label: typeName,
          count: 1,
        });
      }
    });

    arrType.sort((type1, type2) => {
      if (type1.count < type2.count) {
        return 1;
      } else if (type1.count > type2.count) {
        return -1;
      } else {
        return 0;
      }
    });

    const labels = arrType.map((type) => type.label);
    const data = arrType.map((type) => type.count);

    renderChart(moneyCtx, labels, data, `TRANSPORT`);
  }

  _renderTimeSpendChart(points) {
    const moneyCtx = this.element.querySelector(`.statistics__chart--time`);
    const arrType = [];
    points.forEach((point) => {
      const typeName = point.type.name;
      const index = arrType.findIndex((type) => type.label === typeName);
      if (index !== -1) {
        arrType[index].time = point.timeEnd.diff(point.timeStart, `hours`);
      } else {
        arrType.push({
          label: typeName,
          time: point.timeEnd.diff(point.timeStart, `hours`),
        });
      }
    });

    arrType.sort((type1, type2) => {
      if (type1.time < type2.time) {
        return 1;
      } else if (type1.time > type2.time) {
        return -1;
      } else {
        return 0;
      }
    });

    const labels = arrType.map((type) => type.label);
    const data = arrType.map((type) => type.time);
    const formatter = (val) => `${val} H`;

    renderChart(moneyCtx, labels, data, `TIME SPENT`, formatter);
  }

  render(points) {
    this._renderMoneyChart(points);
    this._renderTransportChart(points);
    this._renderTimeSpendChart(points);
  }
}
