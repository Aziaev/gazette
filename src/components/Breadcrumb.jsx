import NavItem from "../components/NavItem";
import NavSplitter from "../components/NavSplitter";

export default function Breadcrumb({ isRouteActive, path, text }) {
  return (
    <>
      <NavSplitter />
      <NavItem isRouteActive={isRouteActive} path={path} text={text} />
    </>
  );
}
