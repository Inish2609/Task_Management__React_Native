import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { TaskContext } from '../store/task-context';
import i18next from '../scripts/language'
import { useTranslation } from 'react-i18next';


export default function ChartScreen(props) {

    const taskCtx = useContext(TaskContext)
    const {t} = useTranslation()
    const pendingCount = taskCtx.tasks.filter(task => task.status === "Pending").length
    const inProgressCount = taskCtx.tasks.filter(task => task.status === "In Progress").length
    const doneCount = taskCtx.tasks.filter(task => task.status === "Done").length

  const chartHTML = `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Interactive Pie Chart</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        canvas {
            cursor: pointer;
        }
    </style>
</head>
<body>
    <canvas id="myPieChart" width="400" height="400"></canvas>
    <script>
        var ctx = document.getElementById('myPieChart').getContext('2d');
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Pending', 'In Progress', 'Done'],
                datasets: [{
                    label: 'My Pie Chart',
                    data: [${pendingCount}, ${inProgressCount}, ${doneCount}],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw;
                            }
                        }
                    }
                },
                onClick: function(e) {
                    const activePoints = myPieChart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
                    if (activePoints.length) {
                        const index = activePoints[0].index;
                        const meta = myPieChart.getDatasetMeta(0);
                        const arc = meta.data[index];
                        
                        // Toggle zoom effect
                        arc._model.borderWidth = arc._model.borderWidth === 3 ? 1 : 3;
                        arc._model.radius = arc._model.borderWidth === 3 ? arc._model.outerRadius + 10 : arc._model.outerRadius - 10;
                        
                        myPieChart.update();
                    }
                }
            }
        });
    </script>
</body>
</html>

  `;

  return (
    <View style={styles.container}>
        <Text style={styles.title} >{t("Pie Chart View Of Our Progress")}</Text>
        <WebView
            originWhitelist={['*']}
            source={{ html: chartHTML }}
            style={styles.webview}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop:200,
    backgroundColor:'white'
  },
  webview: {
    width: '100%',
    height: '100%',
    flex:1
  },
  title:{
    fontSize:24,
    fontFamily:'serif',
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:50
  }
});
