// component
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: icon("ic_analytics"),
  },
  {
    title: "user",
    path: "/dashboard/user",
    icon: icon("ic_user"),
  },
      {
    title: "cameras",
        path: "/dashboard/room",
    icon: icon("ic_blog"),
      },
  {
    title: "Videos",
    path: "/dashboard/products",
    icon: icon("ic_cart"),
  },
 
  {
    title: "Video upload",
    path: "/dashboard/video-upload",
    icon: icon("ic_disabled"),
  },
  
 
];

export default navConfig;
