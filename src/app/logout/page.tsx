import { logout } from "./actions";

export default function Logout() {
  return (
    <form>
      <button formAction={logout}>Log out</button>
    </form>
  );
}
