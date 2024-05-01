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
          // symbol: "mapmarker",
          symbol: "url(./marker.svg)",
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
          "<div style='width: 160px; height: 110px;text-align: center; display: flex; flex-direction: column; justify-content: space-between; padding: 8px;'><div><img src='" +
          this.point.image +
          "' style='max-width: 100px;'></div>" +
          "<p style='text-align: center;'>" +
          this.point.name +
          "</p><b style='text-align: center;'>" +
          this.point.y +
          " miliar*" +
          "</b></div>"
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
        borderColor: "rgba(255, 255, 255,0.5)",
        nullColor: "#073F6A",
      },
      {
        name: "",
        color: "#05AFAA",
        data: [
          [
            "id-ba",
            -8.095400260654107,
            115.03035364089623,
            "Bali Beyond Travel Fair 2023",
            11,
            "./img/bbtf.png",
          ],
          [
            "id-ba",
            -8.528403475889711,
            115.21557343611535,
            "G20",
            17.7,
            "./img/g20.png",
          ],
          [
            "id-nb",
            -8.499254295968968,
            116.30614446629004,
            "MotoGP",
            4.6,
            "./img/motogp.png",
          ],
          ["id-nb", -8.299408, 116.1035749, "WSBK ", 5.2, "./img/sblmotul.png"],
          [
            "id-yo",
            -7.651829238055708,
            110.49143520859982,
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
