import axios from "axios";

const BASE_URL = "https://9c71-2806-10a6-d-835c-27ca-42d9-f568-3db1.ngrok.io/";

export class MeetMeService {
  ListQuiz = async () => {
    try {
      return await axios.get(BASE_URL, {
        headers: { Accept: "application/json" },
      });
    } catch (error) {
      return { status: false, data: error.response.data };
    }
  };
}

const meetmeService = new MeetMeService();
export default meetmeService;
