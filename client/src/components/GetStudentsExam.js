import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import ExamTiming from "./ExamTiming";

const GetStudentsExam = () => {
  const [todayExams, setTodayExams] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const { accessToken } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const todayResponse = await axios.get(
          `${process.env.REACT_APP_SERVERURL}/exam/getforstudents`,
          { headers }
        );
        setTodayExams(todayResponse.data.exams);

        const upcomingResponse = await axios.get(
          `${process.env.REACT_APP_SERVERURL}/exam/getupcoming`,
          { headers }
        );
        setUpcomingExams(upcomingResponse.data.exams);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchData();
  }, []);

  const handleFileUpload = async (examId) => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      };

      await axios.post(
        `${process.env.REACT_APP_SERVERURL}/solution/upload/${examId}`,
        formData,
        { headers }
      );
      console.log("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <section>
        <h2 className="text-center font-bold text-3xl p-2">Today's Exams</h2>
        <div className="flex flex-row flex-wrap justify-center gap-[1.25rem] items-center m-2">
          {todayExams.map((exam) => (
            <div
              className="bg-indigo-200 max-w-full lg:max-w-[25%] p-[1.25rem] rounded-md shadow-md hover:bg-indigo-300 hover:shadow-xl cursor-pointer"
              key={exam._id}
            >
              <p className="font-bold p-[0.15rem]">
                Exam:<span className="font-light"> {exam.name}</span>
              </p>
              <p className="font-bold p-[0.15rem]">
                Subject:<span className="font-light"> {exam.subject}</span>
              </p>
              <p className="font-bold p-[0.15rem]">
                Date:<span className="font-light"> {exam.date}</span>
              </p>

              <p className="font-bold">
                ends in: <ExamTiming deadline={exam.endTime} />
              </p>
              <div className="">
                <input
                  type="file"
                  className="my-2"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>
              <div className=" ">
                <button
                  onClick={() => handleFileUpload(exam._id)}
                  type="submit"
                  className="w-full mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-800"
                >
                  Upload Solution
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-3">
        <h2 className="text-center font-bold text-3xl p-2"> Upcoming Exams</h2>
        <div className="flex flex-col flex-wrap gap-[1.25rem] items-center m-2">
          {upcomingExams.map((exam) => (
            <div
              className="bg-indigo-200 max-w-full lg:max-w-[25%] p-[1.25rem] rounded-md shadow-md hover:bg-indigo-300 hover:shadow-xl cursor-pointer"
              key={exam._id}
            >
              <p className="font-bold p-[0.15rem]">
                Exam:<span className="font-light"> {exam.name}</span>
              </p>
              <p className="font-bold p-[0.15rem]">
                Subject:<span className="font-light"> {exam.subject}</span>
              </p>
              <p className="font-bold p-[0.15rem]">
                Date:<span className="font-light"> {exam.date}</span>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GetStudentsExam;
