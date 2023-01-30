import {
  AppstoreOutlined,
  DashboardOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  HeartOutlined,
  MedicineBoxOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RadarChartOutlined,
  ReconciliationOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const getMenuItemsByAuth = (auth) => {
  if (auth?.grade_t === "병사") {
    return [
      {
        key: "/Total",
        icon: <AppstoreOutlined style={{ fontSize: "20px" }} />,
        label: "종합지수",
      },
      {
        key: "/Daily_Activity",
        icon: <RadarChartOutlined style={{ fontSize: "20px" }} />,
        label: "데일리활동량",
      },
      {
        key: "/Stamina_Management",
        icon: <HeartOutlined style={{ fontSize: "20px" }} />,
        label: "체력관리",
      },
      {
        key: "/Behavioral_Management",
        icon: <ReconciliationOutlined style={{ fontSize: "20px" }} />,
        label: `행동심리 
        (스트레스저항성, 신체활력도)`,
      },
      {
        key: "/Injury_Safety",
        icon: <MedicineBoxOutlined style={{ fontSize: "20px" }} />,
        label: "부상안전도",
      },
    ];
  } else if (auth?.grade_t === "지휘관") {
    return [
      {
        key: "/Total",
        icon: <AppstoreOutlined style={{ fontSize: "20px" }} />,
        label: "종합지수",
      },
      {
        key: "/Daily_Activity",
        icon: <RadarChartOutlined style={{ fontSize: "20px" }} />,
        label: "데일리활동량",
      },
      {
        key: "/Stamina_Management",
        icon: <HeartOutlined style={{ fontSize: "20px" }} />,
        label: "체력관리",
      },
      {
        key: "/Behavioral_Management",
        icon: <ReconciliationOutlined style={{ fontSize: "20px" }} />,
        label: `행동심리 
        (스트레스저항성, 신체활력도)`,
      },
      {
        key: "/Injury_Safety",
        icon: <MedicineBoxOutlined style={{ fontSize: "20px" }} />,
        label: "부상안전도",
      },
    ];
  } else if (auth?.grade_t === "관리자") {
    return [
      {
        key: "/Total",
        icon: <AppstoreOutlined style={{ fontSize: "20px" }} />,
        label: "종합지수",
      },
      {
        key: "/Daily_Activity",
        icon: <RadarChartOutlined style={{ fontSize: "20px" }} />,
        label: "데일리활동량",
      },
      {
        key: "/Stamina_Management",
        icon: <HeartOutlined style={{ fontSize: "20px" }} />,
        label: "체력관리",
      },
      {
        key: "/Behavioral_Management",
        icon: <ReconciliationOutlined style={{ fontSize: "20px" }} />,
        label: `행동심리 
        (스트레스저항성, 신체활력도)`,
      },
      {
        key: "/Injury_Safety",
        icon: <MedicineBoxOutlined style={{ fontSize: "20px" }} />,
        label: "부상안전도",
      },
      {
        key: "/Military_Forces_Adaptability",
        icon: <TeamOutlined style={{ fontSize: "20px" }} />,
        label: "복무적응도",
      },
    ];
  }
  return [];
};
