import Chart from 'chart.js';
import EvenGenerator from './EvenGenerator';
import GaussianGenerator from './GaussianGenerator';
import ExponentialGenerator from './ExponentialGenerator';
import GammaGenerator from './GammaGenerator';
import TriangleGenerator from './TriangleGenerator';
import SimpsonGenerator from './SimpsonGenerator';

document.getElementById('generatorActions').
    addEventListener('submit', (event) => {
      const generatorType = document.body.classList.value;
      const a = document.getElementById('aParam').value;
      const r0 = document.getElementById('r0Param').value;
      const m = document.getElementById('mParam').value;

      let generator = null;
      switch (generatorType) {
        case 'even': {
          const min = document.getElementById('minParam').value;
          const max = document.getElementById('maxParam').value;

          generator = new EvenGenerator({min, max, a, r0, m}, 1000000);
          break;
        }
        case 'gaussian': {
          const n = document.getElementById('nParam').value;
          const mx = document.getElementById('mxParam').value;
          const std = document.getElementById('stdParam').value;

          generator = new GaussianGenerator({n, mx, std, a, r0, m}, 1000000);
          break;
        }
        case 'exponential': {
          const lambda = document.getElementById('lambdaParam').value;

          generator = new ExponentialGenerator({lambda, a, r0, m}, 1000000);
          break;
        }
        case 'gamma': {
          const lambda = document.getElementById('lambdaParam').value;
          const n = document.getElementById('nParam').value;

          generator = new GammaGenerator({lambda, n, a, r0, m}, 1000000);
          break;
        }
        case 'triangle': {
          const min = document.getElementById('minParam').value;
          const max = document.getElementById('maxParam').value;

          generator = new TriangleGenerator({min, max, a, r0, m}, 1000000);
          break;
        }
        case 'simpson': {
          const min = document.getElementById('minParam').value;
          const max = document.getElementById('maxParam').value;

          generator = new SimpsonGenerator({min, max, a, r0, m}, 1000000);
          break;
        }
      }

      generator.generateList();
      generator.spliceList();

      const graphic = showResult(generator);
      showChart(graphic, generatorType, generator);

      event.preventDefault();
      return false;
    }, false);

function showResult(generator) {
  const graphicContainer = document.createElement('canvas');
  const graphic = graphicContainer.getContext('2d');

  const resultContainer = document.getElementById('generatorResult');
  resultContainer.innerHTML = '';
  resultContainer.innerHTML = `
    <h3>Result</h3>
    <ul class="list-group">
      <li class="list-group-item">
        <span class="result-type">Expectation</span>
        <span class="result-value">${generator.getExpectation()}</span>
      </li>
      <li class="list-group-item">
        <span class="result-type">Dispersion</span>
        <span class="result-value">${generator.getDispersion()}</span>
      </li>
      <li class="list-group-item">
        <span class="result-type">SKO</span>
        <span class="result-value">${generator.getSKO()}</span>
      </li>
    </ul>
  `;
  resultContainer.appendChild(graphicContainer);

  return graphic;
}

function showChart(graphic, title, generator) {
  new Chart(graphic, {
    type: 'bar',
    data: {
      labels: generator.labels,
      datasets: [
        {
          label: title,
          data: generator.entries,
          borderWidth: 1,
        }],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          }],
      },
    },
  });
}
