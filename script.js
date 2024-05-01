(async () => {
  const topology = await fetch("./geomap.json").then((response) =>
    response.json()
  );
  function renderChart(point) {
    Highcharts.chart("hc-tooltip", {
      title: {
        text: "Chart inside tooltip",
      },
    });
  }

  Highcharts.addEvent(Highcharts.Tooltip, "refresh", function () {
    renderChart(this.chart.hoverPoint);
  });

  // Create the chart
  Highcharts.mapChart("container", {
    chart: {
      map: topology,
      margin: 1,
    },

    title: {
      text: "",
      floating: true,
      style: {
        textOutline: "5px contrast",
      },
    },

    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: "spacingBox",
        verticalAlign: "bottom",
      },
    },

    mapView: {
      padding: [0, 0, 85, 0],
    },

    legend: {
      floating: true,
      backgroundColor: "#ffffffcc",
    },

    plotOptions: {
      mappoint: {
        keys: ["id", "lat", "lon", "name", "y", "image"],
        marker: {
          lineWidth: 1,
          lineColor: "#000",
          symbol: "mapmarker",
          radius: 8,
        },
        dataLabels: {
          enabled: false,
        },
      },
    },

    // tooltip: {
    //   headerFormat:
    //     '<span style="color:{point.color}">\u25CF</span> {point.key}<br/>',
    //   pointFormat: "{series.name}",
    // },
    tooltip: {
      useHTML: true,
      formatter: function () {
        return (
          "<div style='width: 100px; height: 100px;text-align: center; display: flex; flex-direction: column; justify-content: center;'><div><img src='" +
          this.point.image +
          "' style='max-width: 100px;'></div>" +
          "<p style='text-align: center;'>" +
          this.point.y +
          " miliar*" +
          "</p></div>"
        );
      },
    },

    series: [
      {
        allAreas: true,
        name: "Countries",
        states: {
          inactive: {
            opacity: 1,
          },
        },
        dataLabels: {
          enabled: false,
        },
        enableMouseTracking: false,
        showInLegend: false,
        borderColor: "rgba(0, 0, 0, 0.25)",
        nullColor: "rgba(72 114 206 / 0.4 )",
      },
      {
        name: "",
        color: "rgb(241, 92, 128)",
        data: [
          [
            "id-ba",
            -8.2955908,
            115.1877154,
            "Bali Beyond Travel Fair 2023",
            11,
            "./img/bbtf.png",
          ],
          ["id-ba", -8.8285465, 115.2129977, "G20", 17.7, "./img/g20.png"],
          ["id-nb", -8.699408, 116.2035749, "MotoGP", 4.6, "./img/motogp.png"],
          ["id-nb", -8.899408, 116.3035749, "WSBK ", 5.2, "./img/sblmotul.png"],
          [
            "id-yo",
            -7.7520153,
            110.4866018,
            "Asian tourism forum 2023",
            2.1,
            "./img/asean.png",
          ],
          ,
        ],
        type: "mappoint",
      },
    ],
  });
})();
