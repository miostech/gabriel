import "./video.css";
import { useDataBaseContext } from "../../database/teste";
export default function VideoPage() {
    const {
        getByPhoneNumber,
        userByPhoneNumber,
      } = useDataBaseContext();
  return (
    <>
      <div className="videoContainer">Video page</div>
      <div className="videoContainer">{userByPhoneNumber.number}</div>
    </>
  );
}
