import React, { useEffect, useState } from 'react';
import GenericChart from './GenericChart';
import './chartComponent.css';

const ChartComponent = ({ chartType, dataUrl, query }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch(dataUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();  // Utilisez .text() au lieu de .json() pour inspecter la réponse brute
      })
      .then((textData) => {
        console.log('Réponse brute:', textData);  // Log de la réponse brute
        try {
          const jsonData = JSON.parse(textData);  // Essayer de convertir manuellement en JSON
          if (!Array.isArray(jsonData)) {
            console.error('Invalid data format', jsonData);
            return;
          }
          const firstItem = jsonData[0];
          if (!firstItem) {
            console.error('Empty data array');
            return;
          }
  
          const labelKey = Object.keys(firstItem)[0];
          const valueKey = Object.keys(firstItem)[1];
  
          const labels = jsonData.map((item) => item[labelKey]);
          const values = jsonData.map((item) => item[valueKey]);
  
          setChartData({
            labels: labels,
            datasets: [
              {
                label: 'Données JSON',
                data: values,
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1,
              },
            ],
          });
        } catch (error) {
          console.error('Erreur lors de l’analyse des données JSON:', error);
        }
      })
      .catch((error) => console.error('Error fetching JSON data:', error));
  }, [dataUrl]);
  
  

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className='data-chart-container'>
      <div className='query'>
        <div className='query2'>{query}</div>
      </div>
      <div className='chart'>
        <div className='chart2'>
          {chartData ? (
            <GenericChart type={chartType} data={chartData} options={chartOptions} />
          ) : (
            <p>Chargement des données...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
