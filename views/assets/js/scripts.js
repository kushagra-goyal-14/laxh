// SIDEBAR TOGGLE

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}

// ---------- CHARTS ----------

// BAR CHART
var barChartOptions = {
  series: [
    {
      data: [10, 8, 6, 5, 3],
      name: "Game Modes",
    },
  ],
  chart: {
    type: "bar",
    background: "transparent",
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: ["#2962ff", "#d50000", "#2e7d32", "#ff6d00", "#583cb3"],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: "40%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: 1,
  },
  grid: {
    borderColor: "#55596e",
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: "#f5f7ff",
    },
    show: true,
    position: "top",
  },
  stroke: {
    colors: ["transparent"],
    show: true,
    width: 2,
  },
  tooltip: {
    shared: true,
    intersect: false,
    theme: "dark",
  },
  xaxis: {
    categories: [
      "Reaction Time",
      "Six Shot",
      "Lock Shot",
      "Strafe Shot",
      "Grid Shot",
    ],
    title: {
      style: {
        color: "#f5f7ff",
      },
    },
    axisBorder: {
      show: true,
      color: "#55596e",
    },
    axisTicks: {
      show: true,
      color: "#55596e",
    },
    labels: {
      style: {
        colors: "#f5f7ff",
      },
    },
  },
  yaxis: {
    title: {
      text: "Score out of 10",
      style: {
        color: "#f5f7ff",
      },
    },
    axisBorder: {
      color: "#55596e",
      show: true,
    },
    axisTicks: {
      color: "#55596e",
      show: true,
    },
    labels: {
      style: {
        colors: "#f5f7ff",
      },
    },
  },
};

var barChart = new ApexCharts(
  document.querySelector("#bar-chart"),
  barChartOptions
);
barChart.render();

// AREA CHART
var areaChartOptions = {
  series: [
    {
      name: "Number of Hits",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "Number of Misses",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  chart: {
    type: "area",
    background: "transparent",
    height: 350,
    stacked: false,
    toolbar: {
      show: false,
    },
  },
  colors: ["#00ab57", "#d50000"],
  labels: [
    "First Game",
    "Second Game",
    "Third Game",
    "Fourth Game",
    "Fifth Game",
    "Sixth Game",
    "Seventh Game",
  ],
  dataLabels: {
    enabled: false,
  },
  fill: {
    gradient: {
      opacityFrom: 0.4,
      opacityTo: 0.1,
      shadeIntensity: 1,
      stops: [0, 100],
      type: "vertical",
    },
    type: "gradient",
  },
  grid: {
    borderColor: "#55596e",
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: "#f5f7ff",
    },
    show: true,
    position: "top",
  },
  markers: {
    size: 6,
    strokeColors: "#1b2635",
    strokeWidth: 3,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    axisBorder: {
      color: "#55596e",
      show: true,
    },
    axisTicks: {
      color: "#55596e",
      show: true,
    },
    labels: {
      offsetY: 5,
      style: {
        colors: "#f5f7ff",
      },
    },
  },
  yaxis: [
    {
      title: {
        text: "Number of Hits",
        style: {
          color: "#f5f7ff",
        },
      },
      labels: {
        style: {
          colors: ["#f5f7ff"],
        },
      },
    },
    {
      opposite: true,
      title: {
        text: "Number of Misses",
        style: {
          color: "#f5f7ff",
        },
      },
      labels: {
        style: {
          colors: ["#f5f7ff"],
        },
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
    theme: "dark",
  },
};

var areaChart = new ApexCharts(
  document.querySelector("#area-chart"),
  areaChartOptions
);
areaChart.render();

const playtrain = () => {
  console.log("playtrain");
  document.getElementById("ranking").innerText = "Grid Shot";
  document.getElementById("avg").innerText = "Lock Shot";
  document.getElementById("ex").innerText = "Reaction Time";
  document.getElementById("miss").innerText = "Six Shot";
};
