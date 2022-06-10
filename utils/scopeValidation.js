import jwtDecode from "jwt-decode";
//import { getCookie } from "./cookies";

export default function scopesValidation(necessaryPermissions) {
  const token = window.localStorage.getItem("tk"); // getCookie("token");
  if (!token) return false;
  const { permissions } = jwtDecode(token);
  console.log(necessaryPermissions, permissions);

  const hasAccess = necessaryPermissions.some((necessaryPermission) => {
    return permissions.some((permission) => {
      return (
        permission[0] === necessaryPermission[0] &&
        permission[1] >= necessaryPermission[1]
      );
    });
  });

  return hasAccess;
}
