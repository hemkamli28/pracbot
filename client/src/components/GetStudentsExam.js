import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import ExamTiming from "./ExamTiming";
import PdfThumbnail from "./PdfThumbnail";
import PdfComp from "./PdfComp";

const GetStudentsExam = () => {
  const [todayExams, setTodayExams] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const { accessToken } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

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
        const todayExamsData = todayResponse.data.exams.filter(
          exam => new Date(exam.endTime) > new Date()
        );
        setTodayExams(todayExamsData);

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
  
  const showPdf = (pdf) => {
    setPdfFile(`http://localhost:5000/uploads/${pdf}`);
  };

  const handleThumbnailClick = (pdf) => {
    // Call showPdf only when the thumbnail is clicked
    showPdf(pdf);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-1/2 px-4">
          <h2 className="text-center font-bold text-3xl p-2">Today's Exams</h2>
          <div className="flex flex-wrap justify-center gap-4 items-center m-2">
            {todayExams.map((exam) => (
              <div
                className="bg-indigo-200 p-[1.25rem] rounded-md shadow-md hover:bg-indigo-300 hover:shadow-xl cursor-pointer mb-4"
                key={exam._id}
              >
               
                  <div className="flex flex-row items-center justify-center flex-wrap">
                    <div onClick={() => handleThumbnailClick(exam.filename)}>
                      <PdfThumbnail pdfFile={`http://localhost:5000/uploads/${exam.filename}`} />
                    </div>
                    <div className="ml-4">
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
                      <div>
                        <input
                          type="file"
                          className="my-2"
                          onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                      </div>
                      <div>
                        <button
                          onClick={() => handleFileUpload(exam._id)}
                          type="submit"
                          className="w-full mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-800"
                        >
                          Upload Solution
                        </button>
                        {pdfFile && <PdfComp pdfFile={pdfFile} onClose={() => setPdfFile(null)} />}
                      </div>
                    </div>
                  </div>
               
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[35%] px-4">
          <h2 className="text-center font-bold text-3xl p-2">Upcoming Exams</h2>
          <div className="flex flex-col gap-4 items-center m-2">
            {upcomingExams.map((exam) => (
              <div
                className="bg-indigo-200 w-full p-[1.25rem] rounded-md shadow-md hover:bg-indigo-300 hover:shadow-xl cursor-pointer"
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
        </div>
      </div>
    </div>
  );
};

export default GetStudentsExam;
